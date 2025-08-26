import React, { useState } from 'react'
import { Conversation, Department } from './types'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  conversations: Conversation[]
  currentConversationId: string
  setCurrentConversationId: (id: string) => void
  departmentFilter: string
  setDepartmentFilter: (filter: string) => void
  onCreateNewConversation: () => void
  onLogout: () => void
  setSelectedDepartment: (department: Department) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  conversations,
  currentConversationId,
  setCurrentConversationId,
  departmentFilter,
  setDepartmentFilter,
  onCreateNewConversation,
  onLogout,
  setSelectedDepartment
}) => {
  const [editingConversationId, setEditingConversationId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [conversationToDelete, setConversationToDelete] = useState<string | null>(null)

  const getFilteredConversations = () => {
    if (departmentFilter === 'All') return conversations
    return conversations.filter(conv => conv.department === departmentFilter)
  }

  const startEditingTitle = (conversationId: string, currentTitle: string) => {
    setEditingConversationId(conversationId)
    setEditingTitle(currentTitle)
  }

  const saveEditedTitle = () => {
    if (!editingConversationId || !editingTitle.trim()) return
    
    // This would need to be handled by parent component
    setEditingConversationId(null)
    setEditingTitle('')
  }

  const cancelEditing = () => {
    setEditingConversationId(null)
    setEditingTitle('')
  }

  const showDeleteConfirmation = (conversationId: string) => {
    setConversationToDelete(conversationId)
    setShowDeleteModal(true)
  }

  return (
    <>
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? 'w-80' : 'w-16'
        } flex-shrink-0 flex flex-col overflow-hidden`}>

        {/* User Profile Section - TOP - Fixed */}
        <div className={`border-b border-gray-200 ${sidebarOpen ? 'p-4' : 'py-4 px-2'} flex-shrink-0`}>
          {sidebarOpen ? (
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">DU</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Demo User</p>
                <p className="text-xs text-gray-500">demo.user@user123.com</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-10 w-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-xs">DU</span>
              </div>
            </div>
          )}
        </div>

        {/* Everything Below - Scrollable */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Middle Content */}
          <div className="p-4 space-y-3">
            {/* Toggle Button */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* New Conversation Button */}
            <button 
              onClick={onCreateNewConversation}
              className="w-full flex items-center justify-center h-10 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {sidebarOpen && <span className="ml-2 text-sm">New Chat</span>}
            </button>

            {/* Department Filter & Conversations List */}
            {sidebarOpen && (
              <>
                {/* Department Filter */}
                <div className="mt-6">
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="All">All Departments</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                    <option value="HR">HR</option>
                  </select>
                </div>

                {/* Conversations List */}
                <div className="mt-4 space-y-2">
                  {getFilteredConversations().map((conversation) => (
                    <div key={conversation.id} className="group relative">
                      <button
                        onClick={() => {
                          setCurrentConversationId(conversation.id)
                          setSelectedDepartment(conversation.department as Department)
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          currentConversationId === conversation.id
                            ? 'bg-primary text-white'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                        }`}
                      >
                        {/* Title - Editable or Display */}
                        <div className="text-sm font-medium truncate pr-8">
                          {editingConversationId === conversation.id ? (
                            <input
                              type="text"
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  saveEditedTitle()
                                } else if (e.key === 'Escape') {
                                  cancelEditing()
                                }
                              }}
                              onBlur={saveEditedTitle}
                              className="w-full bg-transparent border-b border-white text-white placeholder-blue-200 focus:outline-none"
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            conversation.title
                          )}
                        </div>
                        
                        <div className={`text-xs mt-1 truncate ${
                          currentConversationId === conversation.id ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {conversation.lastMessage}
                        </div>
                        
                        <div className={`text-xs mt-1 ${
                          currentConversationId === conversation.id ? 'text-blue-200' : 'text-gray-400'
                        }`}>
                          {conversation.department} • {conversation.timestamp.toLocaleDateString()}
                        </div>
                      </button>

                      {/* Action Buttons - Show on hover */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                        {/* Edit Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            startEditingTitle(conversation.id, conversation.title)
                          }}
                          className={`p-1 rounded hover:bg-gray-200 transition-colors ${
                            currentConversationId === conversation.id ? 'text-white hover:bg-blue-700' : 'text-gray-600'
                          }`}
                          title="Edit title"
                        >
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            showDeleteConfirmation(conversation.id)
                          }}
                          className={`p-1 rounded hover:bg-red-100 transition-colors ${
                            currentConversationId === conversation.id ? 'text-red-200 hover:bg-red-700' : 'text-red-500'
                          }`}
                          title="Delete conversation"
                        >
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Bottom Section - Part of the scrollable area */}
          <div className="border-t border-gray-200 p-4 space-y-2">
            {/* Settings Button */}
            <button 
              onClick={() => {
                console.log('Settings clicked!')
              }}
              className={`w-full flex items-center h-10 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${
                sidebarOpen ? 'justify-start px-3' : 'justify-center'
              }`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {sidebarOpen && <span className="ml-2 text-sm">Settings</span>}
            </button>

            {/* Professional Links - Only show when sidebar is open */}
            {sidebarOpen && (
              <div className="pt-2 border-t border-gray-100 space-y-1">
                {/* Upgrade to Plus */}
                <button 
                  onClick={() => console.log('Upgrade to Plus clicked!')}
                  className="w-full flex items-center justify-start px-3 py-2 text-xs text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Upgrade to Plus
                </button>

                {/* Updates & FAQs */}
                <button 
                  onClick={() => console.log('Updates & FAQs clicked!')}
                  className="w-full flex items-center justify-start px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Updates & FAQs
                </button>

                {/* Terms and Conditions */}
                <button 
                  onClick={() => console.log('Terms clicked!')}
                  className="w-full flex items-center justify-start px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Terms & Conditions
                </button>

                {/* Privacy Policy */}
                <button 
                  onClick={() => console.log('Privacy Policy clicked!')}
                  className="w-full flex items-center justify-start px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Privacy Policy
                </button>
              </div>
            )}

            {/* Logout Button */}
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center h-10 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {sidebarOpen && <span className="ml-2 text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Delete Conversation</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this conversation? This action cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setConversationToDelete(null)
                }}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              <button
                onClick={() => {
                  // This would need to be handled by parent component
                  setShowDeleteModal(false)
                  setConversationToDelete(null)
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
