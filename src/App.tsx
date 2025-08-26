import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage'
import ChatbotPageRefactored from './components/ChatbotPageRefactored'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Add console log for debugging
    console.log('App component mounted')
    
    // Check if user is already logged in
    try {
      const authStatus = localStorage.getItem('isAuthenticated')
      console.log('Auth status from localStorage:', authStatus)
      if (authStatus === 'true') {
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleLogin = (username: string, password: string): boolean => {
    // Hardcoded credentials as per requirements
    if (username === 'user123' && password === 'pass123') {
      setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', 'true')
      return true
    }
    return false
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light">
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/chatbot" replace /> : 
              <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/chatbot" 
          element={
            isAuthenticated ? 
              <ChatbotPageRefactored onLogout={handleLogout} /> : 
              <Navigate to="/login" replace />
          } 
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/chatbot" : "/login"} replace />} />
      </Routes>
    </div>
  )
}

export default App
