import React from 'react'
import { Department } from './types'

interface ChatHeaderProps {
  selectedDepartment: Department
  setSelectedDepartment: (department: Department) => void
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedDepartment,
  setSelectedDepartment
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 slide-in-bottom">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4 scale-in">
          <div className="h-10 w-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-dark">AI Chatbot</h1>
            <p className="text-sm text-gray-500">Powered by AI</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Greeting Section */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:block">
              <p className="text-sm text-gray-600">
                Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, <span className="font-medium text-primary">Demo User</span> 👋
              </p>
            </div>
          </div>
          
          {/* Department Dropdown */}
          <div className="relative">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value as Department)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="HR">HR</option>
            </select>
            <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ChatHeader
