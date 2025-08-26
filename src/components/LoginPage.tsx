import React, { useState } from 'react'

interface LoginPageProps {
  onLogin: (username: string, password: string) => boolean
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Client-side validation
    if (!username.trim()) {
      setError('Username is required')
      return
    }
    
    if (!password.trim()) {
      setError('Password is required')
      return
    }

    setIsLoading(true)
    
    // Simulate async login
    setTimeout(() => {
      const success = onLogin(username, password)
      if (!success) {
        setError('Invalid username or password')
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light p-4 relative overflow-hidden">
      {/* Background bottom glare effect */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-tl from-purple-300 to-transparent animate-pulse-slow">
      </div>

      <div className="max-w-md w-full relative z-10 slide-in-right">
        <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 border-2 border-purple-300">
          {/* Header */}
          <div className="text-center mb-8 sencond-element">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-4 hover:scale-110 transition-transform cursor-pointer slide-in-bottom delay-800">
              <svg className="h-8 w-8 text-white slide-in-bottom delay-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-dark slide-in-bottom delay-400">AI Chatbot</h2>
            <p className="text-gray-600 mt-2 slide-in-bottom delay-200">Sign in to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-dark mb-2 slide-in-left delay-200">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 slide-in-left delay-400"
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark mb-2 slide-in-left delay-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 slide-in-left delay-500"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-light py-3 px-4 rounded-lg font-semibold hover:from-secondary hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg active:scale-95 slide-in-up delay-400"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-100 rounded-xl scale-in delay-1000">
            <p className="text-sm text-dark text-center mb-2">Demo Credentials:</p>
            <div className="text-xs text-dark text-center space-y-1">
              <div><strong>Username:</strong> user123</div>
              <div><strong>Password:</strong> pass123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
