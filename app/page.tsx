import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
   <main className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 flex items-center justify-center">

    <div className="absolute inset-0 -z-10 h-full bg-white bg-[linear-gradient(to_right,#e5e5e5_5px, transparent_5px), linear-gradient(to_bottom,#e5e5e5_5px, transparent_5px)] bg-[size:6rem_4rem] "/>

    <section
    className="w-full px-4 py-8 mx-automax-7xl sm:px-6 lg:px-8 flex flex-col items-center space-y-10 text-center"
    >
        {/* Hero section */}
        <header className="space-y-8">
        <h1 className="relative text-5xl sm:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
  {/* Floating "Genesis" Badge - Positioned Top Right */}
  <span className="absolute -top-4 right-0 sm:-top-6 sm:right-2 bg-gray-800 text-gray-300 text-xs sm:text-sm font-medium px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
    -Genesis
  </span>
  
  {/* Main "X" */}
  <span className="text-8xl sm:text-9xl font-extrabold text-gray-400 drop-shadow-lg">
    X
  </span>
</h1>



          <p className="max-w-[600px] text-lg text-gray-600 md:text-xl/relaxed xl:text-2xl/relaxed">
          Meet your new AI Chat Agent- Need anything she&apos;s got you covered

          <br/>
          <span
          className="text-gray-400 text-sm"
          >
            Powered by IBm WxTools and top LLMs
          </span>
          </p>
        </header>
        <SignedIn>
          <Link href="/dashboard"
          >
            <button
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
             Let&apos;s Chat!
              <ArrowRight
            className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5"
            />
            <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity group-hover:opacity-100 transition-opacity"
            />
            </button>
            
          

           
          </Link>
        </SignedIn>
        <SignedOut>
            <SignInButton
            mode="modal"
            fallbackRedirectUrl={"/dashboard"}
            forceRedirectUrl={"/dashboard"}

            >
              <button
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Start now for free!

                <ArrowRight
                className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5"
                />
                <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>
            </SignInButton>
        </SignedOut>

        {/* Features grid */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 pt-10 max-w-4xl mx-auto">
  {[
    { title: "⚡ Fast", description: "Real-time streamed responses" },
    { title: "🚀 Modern", description: "Built with Next.js 15, Convex, and Clerk" },
    { title: "🧠 Smart", description: "Powered by top-tier LLMs for intelligent responses" },
  ].map(({ title, description }) => (
    <div key={title} className="text-center bg-white shadow-md rounded-2xl p-6 ring-1 ring-gray-200">
      <div className="text-2xl font-bold text-gray-900">{title}</div>
      <div className="text-sm text-gray-600 mt-2">{description}</div>
    </div>
  ))}
</div>

    </section>

   </main>
  );
}
