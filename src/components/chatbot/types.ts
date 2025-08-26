export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export interface Conversation {
  id: string
  title: string
  department: string
  lastMessage: string
  timestamp: Date
  messages: Message[]
}

export interface ChatbotPageProps {
  onLogout: () => void
}

export type Department = 'Marketing' | 'Sales' | 'Support' | 'HR'
