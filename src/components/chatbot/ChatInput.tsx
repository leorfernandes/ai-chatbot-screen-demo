import React from 'react'
import { Department } from './types'
import { getPlaceholder } from './utils'

interface ChatInputProps {
  inputMessage: string
  setInputMessage: (message: string) => void
  onSendMessage: (e: React.FormEvent) => void
  isTyping: boolean
  selectedDepartment: Department
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  setInputMessage,
  onSendMessage,
  isTyping,
  selectedDepartment
}) => {
  return (
    <div className="border-t border-gray-200 bg-white p-4 slide-in-right">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={onSendMessage} className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={getPlaceholder(selectedDepartment)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent pr-12"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
        <p className="text-xs text-gray-500 text-center mt-2">
          Department: {selectedDepartment} • Press Enter to send
        </p>
      </div>
    </div>
  )
}

export default ChatInput
