import React from 'react'

function WelcomeMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-10">
    <div className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-200 px-8 py-6 max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">🚀 Welcome to Agent X!</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
            I'm here to assist you with a range of tasks, including:
        </p>
        <ul className="space-y-3 text-gray-700 text-left">
            <li className="flex items-center gap-2">
                <span className="text-blue-500">🔍</span>
                <span>Finding and analyzing YouTube video transcripts</span>
            </li>
            <li className="flex items-center gap-2">
                <span className="text-blue-500">📚</span>
                <span>Searching through Google Books</span>
            </li>
            <li className="flex items-center gap-2">
                <span className="text-blue-500">💾</span>
                <span>Processing and extracting insights from JSON data</span>
            </li>
        </ul>
        <p className="text-gray-700 mt-5 leading-relaxed">
            Feel free to ask me anything—I'm here to help! 🤖✨
        </p>
    </div>
</div>

  )
}

export default WelcomeMessage