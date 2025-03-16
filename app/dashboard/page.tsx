import { BotIcon } from 'lucide-react'
import React from 'react'

function page() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
    <div className="relative max-w-2xl w-full">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-100 to-gray-50/50 rounded-3xl shadow-lg"></div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50 rounded-3xl"></div>
  
      {/* Main Content */}
      <div className="relative space-y-6 p-8 text-center">
        <div className="bg-white/70 backdrop-blur-md shadow-xl ring-1 ring-gray-300/40 rounded-2xl p-6 space-y-5 transition hover:shadow-2xl">
          {/* Bot Icon with Glow Effect */}
          <div className="bg-gradient-to-b from-gray-50 to-white rounded-xl p-4 inline-flex shadow-md hover:shadow-lg transition-all duration-300">
            <BotIcon className="w-14 h-14 text-gray-700 drop-shadow-md" />
          </div>
  
          {/* Title with Animated Gradient */}
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent animate-gradient">
            Welcome to the Future!
          </h2>
  
          {/* Description */}
          <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">
            Start a new experience or continue where you left off.{" "}
            <span className="text-gray-900 font-bold">Temba</span> is here to assist with any task, anytime.
          </p>
  
          {/* Features Section */}
          <div className="pt-3 flex justify-center gap-6 text-sm text-gray-600">
            {[
              { label: "Real-time responses", color: "bg-blue-500" },
              { label: "Smart assistance", color: "bg-green-500" },
              { label: "Powerful tools", color: "bg-purple-500" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color} animate-pulse`}></div>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default page