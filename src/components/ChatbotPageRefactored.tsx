import React, { useState } from 'react'
import { ChatbotPageProps, Conversation, Message, Department } from './chatbot/types'
import { generateBotResponse } from './chatbot/utils'
import Sidebar from './chatbot/Sidebar'
import ChatHeader from './chatbot/ChatHeader'
import ChatMessages from './chatbot/ChatMessages'
import ChatInput from './chatbot/ChatInput'

const ChatbotPageRefactored: React.FC<ChatbotPageProps> = ({ onLogout }) => {
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department>('Marketing')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentConversationId, setCurrentConversationId] = useState('1')
  const [departmentFilter, setDepartmentFilter] = useState('All')

  // Enhanced conversations state - each conversation has its own messages
  const [conversations, setConversations] = useState<Conversation[]>([
    { 
      id: '1', 
      title: 'Marketing Strategy Discussion', 
      department: 'Marketing', 
      lastMessage: 'What is brand awareness?', 
      timestamp: new Date(),
      messages: [
        { id: '1-1', text: 'What is brand awareness?', sender: 'user', timestamp: new Date(Date.now() - 300000) },
        { id: '1-2', text: 'Brand awareness is how familiar your target audience is with your brand and products. It encompasses market research, brand positioning, content creation, advertising, and customer engagement across multiple channels to attract and retain customers. Is there anything specific about marketing you\'d like me to elaborate on?', sender: 'bot', timestamp: new Date(Date.now() - 240000) }
      ]
    },
    { 
      id: '2', 
      title: 'Sales Pipeline Review', 
      department: 'Sales', 
      lastMessage: 'How to improve sales performance?', 
      timestamp: new Date(Date.now() - 3600000),
      messages: [
        { id: '2-1', text: 'How to improve sales performance?', sender: 'user', timestamp: new Date(Date.now() - 3600000) },
        { id: '2-2', text: '**Tips to Improve Sales Performance:**\n\n• **Build Strong Relationships** - Focus on understanding customer needs rather than just selling\n• **Quality Lead Generation** - Target the right prospects who match your ideal customer profile\n• **Active Listening** - Ask questions and truly listen to customer pain points', sender: 'bot', timestamp: new Date(Date.now() - 3540000) }
      ]
    },
    { 
      id: '3', 
      title: 'HR Policy Questions', 
      department: 'HR', 
      lastMessage: 'Why is employee engagement important?', 
      timestamp: new Date(Date.now() - 7200000),
      messages: [
        { id: '3-1', text: 'Why is employee engagement important?', sender: 'user', timestamp: new Date(Date.now() - 7200000) },
        { id: '3-2', text: 'Employee engagement is crucial because engaged employees are more productive and less likely to leave. Strong HR functions improve employee engagement, which directly correlates with better performance, higher customer satisfaction, and increased profitability.', sender: 'bot', timestamp: new Date(Date.now() - 7140000) }
      ]
    }
  ])

  // Get current conversation
  const getCurrentConversation = (): Conversation => {
    return conversations.find(conv => conv.id === currentConversationId) || conversations[0]
  }

  // Get messages for current conversation
  const getCurrentMessages = (): Message[] => {
    return getCurrentConversation().messages
  }

  // Update conversation's last message and timestamp
  const updateConversationLastMessage = (conversationId: string, lastMessage: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, lastMessage, timestamp: new Date() }
        : conv
    ))
  }

  // Create a new conversation
  const createNewConversation = () => {
    const newConversationId = `conv-${Date.now()}`
    const departmentOptions: Department[] = ['Marketing', 'Sales', 'Support', 'HR']
    const randomDepartment = departmentOptions[Math.floor(Math.random() * departmentOptions.length)]
    
    const newConversation: Conversation = {
      id: newConversationId,
      title: `New Chat`,
      department: randomDepartment,
      lastMessage: 'Start a new conversation...',
      timestamp: new Date(),
      messages: [
        {
          id: `${newConversationId}-welcome`,
          text: `Hello! I'm your AI assistant. How can I help you today?`,
          sender: 'bot',
          timestamp: new Date()
        }
      ]
    }

    // Add new conversation to the list
    setConversations(prev => [newConversation, ...prev])
    
    // Switch to the new conversation
    setCurrentConversationId(newConversationId)
    
    // Update the department selector to match the new conversation
    setSelectedDepartment(randomDepartment)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: `${currentConversationId}-${Date.now()}`,
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    // Add user message to current conversation
    setConversations(prev => prev.map(conv => 
      conv.id === currentConversationId
        ? { ...conv, messages: [...conv.messages, userMessage] }
        : conv
    ))

    // Update conversation's last message
    updateConversationLastMessage(currentConversationId, inputMessage.trim())

    const currentInput = inputMessage.trim()
    setInputMessage('')
    setIsTyping(true)

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = generateBotResponse(currentInput, selectedDepartment)
      const botMessage: Message = {
        id: `${currentConversationId}-${Date.now()}-bot`,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }

      // Add bot message to current conversation
      setConversations(prev => prev.map(conv => 
        conv.id === currentConversationId
          ? { ...conv, messages: [...conv.messages, botMessage] }
          : conv
      ))

      // Update conversation's last message
      updateConversationLastMessage(currentConversationId, botResponse.substring(0, 50) + '...')
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="h-screen bg-light flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        conversations={conversations}
        currentConversationId={currentConversationId}
        setCurrentConversationId={setCurrentConversationId}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        onCreateNewConversation={createNewConversation}
        onLogout={onLogout}
        setSelectedDepartment={setSelectedDepartment}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <ChatHeader
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
        />

        {/* Chat Messages */}
        <ChatMessages
          messages={getCurrentMessages()}
          isTyping={isTyping}
        />

        {/* Message Input */}
        <ChatInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          selectedDepartment={selectedDepartment}
        />
      </div>
    </div>
  )
}

export default ChatbotPageRefactored
