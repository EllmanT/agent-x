// how we actually build the model
import {ChatAnthropic} from "@langchain/anthropic"
import {ToolNode} from "@langchain/langgraph/prebuilt"
import wxflows from "@wxflows/sdk/langchain"
import {
    END,
    MemorySaver,
    MessagesAnnotation,
    START,
    StateGraph
} from "@langchain/langgraph"
import SYSTEM_MESSAGE from "@/constants/systemMessage"
import { AIMessage, BaseMessage, HumanMessage, SystemMessage, trimMessages } from "@langchain/core/messages"
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts"

// Customers at: https://introspection.apis.stepzen.com/customers
// Comments at: https://dummyjson.com/comments

//Trimmer function
const trimmer = trimMessages({
    maxTokens:10,
    strategy:"last",
    tokenCounter:(msg)=>msg.length,
    includeSystem:true,
    allowPartial:false,
    startOn:"human"
})

// Connect to wxflows

const toolClient= new wxflows({
    endpoint:process.env.WXFLOWS_ENDPOINT||"",
    apikey:process.env.WXFLOWS_API_KEY
})

// Retrieve the tools
const tools = await toolClient.lcTools;
const toolNode = new ToolNode(tools)
const initialiseModel = ()=>{
    const model = new ChatAnthropic({
        modelName:"claude-3-5-sonnet-20241022",
        anthropicApiKey:process.env.ANTHROPIC_API_KEY,
        temperature:0.7, //higher is more creative
        maxTokens:4096, //higher for longer responses
        streaming:true, //enables streaming for sse
        clientOptions:{
            defaultHeaders:{
                "anthropic-beta":"prompt-caching-2024-07-31"
            }

        },
        callbacks:[
            {
                handleLLMStart: async()=>{
                        console.log("Start LLM call")
                },
                handleLLMEnd:async(output)=>{
                    console.log("End LLM call", output)
                    const usage = output.llmOutput?.usage;

                    if(usage){

                    }
                }
            }
        ]
    }).bindTools(tools)

    return model;
}

function shouldContinue(state: typeof MessagesAnnotation.State){
    const messages= state.messages;
    const lastMessage = messages[messages.length-1] as AIMessage;

    // If the LLM makes a tool call, then we route to the tools node

    if(lastMessage.tool_calls?.length){
        return "tools";
    }

    // if the last message is a tool message , route back to agent

    if(lastMessage.content && lastMessage.getType()==="tool"){
        return "agent";
    }
    // Otherwise we stop reply

    return END;
}

// 
const createWorkflow = ()=>{
    const model = initialiseModel();

    // Creating a state graph
    const stateGraph = new StateGraph(MessagesAnnotation).addNode('agent', async(state)=>{
        // Create the system message
        const systemContent = SYSTEM_MESSAGE;

        // Chat prompt template with system message and messages placeholder

        const promptTemplate = ChatPromptTemplate.fromMessages([
            new SystemMessage(systemContent,{
                cache_control:{type:"ephemeral"}, //sET A CACHE breakpoint is 4
            }),
            new MessagesPlaceholder("messages"),
        ]);
            // Trim the messages to manage conversation history
            const trimmedMessages = await trimmer.invoke(state.messages)

            // Format the prompt with the current messages
            const prompt = await promptTemplate.invoke({messages:trimmedMessages})

            // Get response from the model
            const response = await model.invoke(prompt);

            console.log("THe response for  the model", response)
            return {messages: [response]}


     

    }).addEdge(START,"agent")
    .addNode("tools", toolNode)
    .addConditionalEdges("agent",shouldContinue)
    .addEdge("tools", "agent")
    
return stateGraph;

}

function addCachingHeaders(messages:BaseMessage[]): BaseMessage[]{
    // Rules of caching headers for turnbyturn conversations
    // 1.Cache the first system message
    // 2.Cache the last message
    // 3.Cache the second to last human message

    if(!messages.length) return messages;

    // Creae a copy of messages to avoid mutating therigil
    const cachedMessages =[...messages];
    
    // Helper to add cache control
    const addCache = (message:BaseMessage)=>{
        message.content =[
            {
                type:"text",
                text:message.content as string,
                cache_control:{type:"ephemeral"}
            }
        ]
    };
    // Cache the last message
    // console.log("Caching the last message");

    addCache(cachedMessages.at(-1)!);

    // Find the second to last human message 

    let humanCount =0;

    for(let i=cachedMessages.length - 1 ; i>=0; i--){
        if(cachedMessages[i] instanceof HumanMessage){
            humanCount++;
            if(humanCount ===2){
                console.log("Caching the second to last human message");
                addCache(cachedMessages[i]);
                break;
            }
        }
    }
    return cachedMessages
}
export async function submitQuestion(messages:BaseMessage[], chatId:string){
    const cachedMessages= addCachingHeaders(messages)
    console.log("Cached Messages",cachedMessages)
    const workflow = createWorkflow();

    // Create a checkpoint to save the state of the conversation
    const checkpointer = new MemorySaver();
    const app = workflow.compile({checkpointer});

    console.log("Messages: ", messages)
    // Run the graph and stream
    const stream = await app.streamEvents(
        {
        messages: cachedMessages
            // messages:messages
        },
        {
            version:"v2",
            configurable:{
                thread_id:chatId
            },
            streamMode:"messages",
            runId:chatId
        }
    )

    console.log("stream", stream)

    return stream;
}