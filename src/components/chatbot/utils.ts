import { Department } from './types'

// Generate bot responses based on user input and selected department
export const generateBotResponse = (input: string, department?: Department): string => {
  const lowerInput = input.toLowerCase()
  
  // Department-specific responses
  if (department === 'Sales') {
    if (lowerInput.includes('lead') || lowerInput.includes('prospect')) {
      return "**Lead Generation Tips:**\n\n• **Quality over Quantity** - Focus on qualified leads that match your ideal customer profile\n• **Multiple Channels** - Use social media, email, content marketing, and networking\n• **Follow-up Strategy** - Create a systematic approach to nurture leads through the sales funnel\n• **Track Metrics** - Monitor conversion rates and ROI for each lead source"
    }
    if (lowerInput.includes('close') || lowerInput.includes('deal')) {
      return "**Closing Deals Successfully:**\n\n• **Build Trust** - Establish credibility and rapport with prospects\n• **Handle Objections** - Listen carefully and address concerns with empathy\n• **Create Urgency** - Use time-sensitive offers or limited availability\n• **Ask for the Sale** - Be direct and confident in your closing approach"
    }
  } else if (department === 'Marketing') {
    if (lowerInput.includes('brand') || lowerInput.includes('awareness')) {
      return "**Building Brand Awareness:**\n\n• **Consistent Messaging** - Maintain unified voice across all channels\n• **Content Marketing** - Create valuable, shareable content that resonates\n• **Social Media Presence** - Engage actively with your target audience\n• **Influencer Partnerships** - Collaborate with industry thought leaders\n• **Customer Stories** - Showcase testimonials and case studies"
    }
    if (lowerInput.includes('campaign') || lowerInput.includes('strategy')) {
      return "**Effective Marketing Campaigns:**\n\n• **Define Clear Goals** - Set specific, measurable objectives\n• **Know Your Audience** - Create detailed buyer personas\n• **Multi-Channel Approach** - Combine digital and traditional marketing\n• **A/B Testing** - Continuously optimize messaging and creative\n• **Performance Analytics** - Track ROI and adjust strategies based on data"
    }
  } else if (department === 'Support') {
    if (lowerInput.includes('customer') || lowerInput.includes('service')) {
      return "**Excellent Customer Support:**\n\n• **Quick Response Times** - Acknowledge inquiries within 1 hour\n• **Active Listening** - Understand the customer's full concern before responding\n• **Empathy First** - Show genuine care for customer frustrations\n• **Follow-up** - Ensure issues are fully resolved to customer satisfaction\n• **Knowledge Base** - Maintain comprehensive self-service resources"
    }
  } else if (department === 'HR') {
    if (lowerInput.includes('employee') || lowerInput.includes('engagement')) {
      return "**Employee Engagement Strategies:**\n\n• **Regular Feedback** - Conduct frequent one-on-ones and surveys\n• **Professional Development** - Offer training and career growth opportunities\n• **Work-Life Balance** - Promote flexible schedules and wellness programs\n• **Recognition Programs** - Celebrate achievements and milestones\n• **Open Communication** - Foster transparent dialogue at all levels"
    }
  }
  
  // Generic helpful responses
  const responses = [
    "That's a great question! Let me help you with that. Based on current best practices, I'd recommend focusing on understanding your specific needs first. Could you provide more details about what you're trying to achieve?",
    "Thanks for reaching out! I'd be happy to assist you with this topic. To give you the most relevant advice, could you tell me more about your current situation or challenges?",
    "I understand you're looking for guidance on this. Here are some key points to consider:\n\n• **Research thoroughly** - Make sure you understand all aspects\n• **Start small** - Test your approach before scaling\n• **Monitor results** - Track progress and adjust as needed\n\nWhat specific aspect would you like me to elaborate on?",
    "That's an interesting point! From my experience helping others in similar situations, the key is usually to break down the challenge into smaller, manageable steps. What's your biggest concern right now?",
    "Great question! This is definitely something many people in your department deal with. The most effective approach typically involves:\n\n• **Clear planning** - Define your objectives upfront\n• **Team collaboration** - Get input from relevant stakeholders\n• **Regular evaluation** - Review and adjust your strategy\n\nWhat would be most helpful for your specific situation?"
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

export const getPlaceholder = (department: Department): string => {
  switch (department) {
    case 'Sales':
      return 'Enter your sales query here...'
    case 'Marketing':
      return 'Enter your marketing query here...'
    case 'Support':
      return 'Enter your support query here...'
    case 'HR':
      return 'Enter your HR query here...'
    default:
      return 'Enter your query here...'
  }
}
