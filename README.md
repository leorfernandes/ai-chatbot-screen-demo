# AI Chat Screen Demo

A modern, responsive chat interface built with React, TypeScript, and Tailwind CSS. Features a clean, component-based architecture with advanced conversation management and simulated AI responses.

## 🌐 Live Demo
**[Try it live: ai-chatbot-screen.vercel.app](https://ai-chatbot-screen.vercel.app)**

*Login with: `user123` / `pass123`*

## ✨ Key Features

### 🔐 **Authentication System**
- Secure login with client-side validation
- Session persistence with localStorage
- Credentials: `user123` / `pass123`

### 💬 **Interactive Chat Interface**
- **Multi-Conversation Management**: Create, edit, and delete multiple chat conversations
- **Department-Specific Responses**: Pre-programmed responses tailored to Sales, Marketing, Support, and HR departments
- **Real-time Interaction**: Typing indicators, message timestamps, and smooth animations
- **Rich Message Formatting**: Support for bold text and bullet points in responses
- **Conversation History**: Persistent conversation list with last message preview

### 🏢 **Department Integration**
- Dynamic department selection with specialized placeholders:
  - **Sales**: "Enter your sales query here..." (Lead generation, closing deals)
  - **Marketing**: "Enter your marketing query here..." (Brand awareness, campaigns)
  - **Support**: "Enter your support query here..." (Customer service excellence)
  - **HR**: "Enter your HR query here..." (Employee engagement strategies)

### 📱 **Responsive Design**
- Mobile-first approach with Tailwind CSS
- Collapsible sidebar for optimal mobile experience
- Smooth animations and professional UI/UX
- Cross-device compatibility

### 🏗️ **Modern Architecture**
- **Component-based**: Modular, reusable components
- **TypeScript**: Full type safety throughout the application
- **Clean Code**: Well-organized file structure and separation of concerns

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Development**: ESLint, PostCSS

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone or download the project files

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Login**: Use the credentials `user123` / `pass123` to access the chat interface
2. **Department Selection**: Choose a department from the dropdown to see the input placeholder change
3. **Chat**: Type your messages and receive pre-programmed responses based on the selected department
4. **Logout**: Click the logout icon in the header to return to the login screen

## 📁 Project Structure

```
src/
├── components/
│   ├── chatbot/                    # Modular chatbot components
│   │   ├── types.ts               # TypeScript interfaces and types
│   │   ├── utils.ts               # Utility functions and response logic
│   │   ├── FormattedMessage.tsx   # Message formatting component
│   │   ├── Sidebar.tsx            # Conversation management sidebar
│   │   ├── ChatHeader.tsx         # Header with department selection
│   │   ├── ChatMessages.tsx       # Message display area
│   │   └── ChatInput.tsx          # Message input field
│   ├── LoginPage.tsx              # Authentication component
│   └── ChatbotPageRefactored.tsx  # Main chatbot orchestrator
├── utils/
│   └── animations.ts              # CSS animation utilities
├── App.tsx                        # Application routing and state management
├── main.tsx                       # Application entry point
├── index.css                      # Global styles and Tailwind imports
└── ...
```

## 🚀 Getting Started

### 🌐 **Try the Live Demo**
Visit **[ai-chatbot-screen.vercel.app](https://ai-chatbot-screen.vercel.app)** and login with:
- Username: `user123` 
- Password: `pass123`

### 💻 **Local Development**

#### 💻 **Local Development**

#### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

#### Quick Start
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   Open `http://localhost:5173` in your browser

4. **Login:**
   - Username: `user123`
   - Password: `pass123`

### Production Build
```bash
npm run build
npm run preview
```

## 🎮 How to Use

1. **Login** with the provided credentials
2. **Select Department** from the dropdown to get specialized responses
3. **Start Chatting** - type questions and receive department-specific responses
4. **Create New Conversations** using the "New Chat" button
5. **Manage Conversations** - edit titles, delete conversations, filter by department
6. **Switch Departments** to get different types of assistance

## 💡 Response Examples

- **Sales**: Ask about "lead generation" or "closing deals"
- **Marketing**: Ask about "brand awareness" or "campaign strategy"  
- **Support**: Ask about "customer service" best practices
- **HR**: Ask about "employee engagement" strategies

## ✅ Technical Features Implemented

| Feature | Status | Implementation |
|---------|--------|----------------|
| **ReactJS Application** | ✅ | React 18 with TypeScript and modern hooks |
| **Login Page** | ✅ | Secure authentication with validation and persistence |
| **Hardcoded Credentials** | ✅ | `user123` / `pass123` with clear instructions |
| **Dynamic Placeholder** | ✅ | Department-specific placeholders that update dynamically |
| **Responsive Design** | ✅ | Mobile-first design with collapsible sidebar |
| **User-Friendly Interface** | ✅ | Modern design with smooth animations and intuitive UX |
| **Tailwind CSS** | ✅ | Complete styling with custom design system |

### 🌟 **Additional Features**
- Multi-conversation management
- Department-specific pre-programmed responses
- Rich text formatting in messages
- Conversation editing and deletion
- Advanced sidebar with filtering
- Professional animations and transitions
- Component-based architecture
- Full TypeScript implementation

## 📱 Browser Support & Compatibility

- **Chrome** (latest) - ✅ Full support
- **Firefox** (latest) - ✅ Full support  
- **Safari** (latest) - ✅ Full support
- **Edge** (latest) - ✅ Full support
- **Mobile browsers** - ✅ Responsive design tested

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

## 📝 Development Notes

- **Performance**: Optimized with React memo and efficient state management
- **Accessibility**: ARIA labels and keyboard navigation support
- **Code Quality**: ESLint configuration with TypeScript support
- **Scalability**: Modular component architecture for easy expansion

---

*Built with ❤️ and a lot of coffee by Leo Fernandes*
