import React from 'react'

interface FormattedMessageProps {
  text: string
}

const FormattedMessage: React.FC<FormattedMessageProps> = ({ text }) => {
  // Function to parse inline formatting within a line
  const parseInlineFormatting = (text: string) => {
    if (!text.includes('**')) {
      return <span>{text}</span>
    }
    
    const parts = text.split('**')
    return (
      <>
        {parts.map((part, partIndex) => 
          partIndex % 2 === 1 ? (
            <strong key={partIndex} className="font-semibold text-gray-900">{part}</strong>
          ) : (
            <span key={partIndex}>{part}</span>
          )
        )}
      </>
    )
  }
  
  // Split text by lines and handle markdown-style formatting
  const lines = text.split('\n')
  
  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        // Handle bullet points
        if (line.startsWith('• ') || line.startsWith('- ')) {
          const bulletContent = line.substring(2)
          return (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-primary mt-1 font-bold">•</span>
              <span className="flex-1">{parseInlineFormatting(bulletContent)}</span>
            </div>
          )
        }
        
        // Handle empty lines
        if (line.trim() === '') {
          return <div key={index} className="h-1"></div>
        }
        
        // Regular text with inline formatting
        return (
          <p key={index} className="leading-relaxed">
            {parseInlineFormatting(line)}
          </p>
        )
      })}
    </div>
  )
}

export default FormattedMessage
