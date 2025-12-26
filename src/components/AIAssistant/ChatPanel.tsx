'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader2, Bot, User as UserIcon } from 'lucide-react'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import { TypingIndicator } from './TypingIndicator'

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * ChatPanel Component
 *
 * Sliding chat panel for AI Assistant integration.
 * Features:
 * - Slide-in/out animation from right
 * - Message history display
 * - Real-time message input
 * - Loading states with typing indicator
 * - Auto-scroll to latest message
 * - Mock data for Phase 1 testing
 */
export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId] = useState(() => crypto.randomUUID())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Load mock data on mount (Phase 1)
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      loadMockHistory()
    }
  }, [isOpen])

  const loadMockHistory = () => {
    // Mock conversation history for Phase 1 testing
    const mockMessages: Message[] = [
      {
        id: '1',
        role: 'assistant',
        content: "Hi! I'm your AI Assistant. I can help you navigate the workflow suite, answer questions, and provide guidance. How can I assist you today?",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      },
      {
        id: '2',
        role: 'user',
        content: 'How do I create a new project?',
        timestamp: new Date(Date.now() - 3500000),
      },
      {
        id: '3',
        role: 'assistant',
        content: "To create a new project:\n\n1. Navigate to the **Projects** section in Business Ops\n2. Click the **'New Project'** button in the top right\n3. Fill in the project details (name, client, budget, timeline)\n4. Click **'Create Project'** to save\n\nYou can also create projects directly from the Dashboard quick actions!",
        timestamp: new Date(Date.now() - 3400000),
      },
    ]
    setMessages(mockMessages)
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Phase 1: Mock AI response
      // Phase 2: Replace with actual API call
      await mockAIResponse(input)
    } catch (error) {
      console.error('Failed to send message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  // Mock AI response for Phase 1 testing
  const mockAIResponse = async (userInput: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    let aiResponse = ''

    // Simple keyword-based responses for testing
    const input = userInput.toLowerCase()

    if (input.includes('project')) {
      aiResponse = "I can help you with projects! You can view, create, and manage projects in the **Business Ops** dashboard. Navigate to the Projects section to see your active projects, or use the 'New Project' button to create one."
    } else if (input.includes('invoice')) {
      aiResponse = "For invoices, go to **Business Ops** → **Invoices**. You can create new invoices, track payments, and send them to clients directly from there."
    } else if (input.includes('help') || input.includes('how')) {
      aiResponse = "I'm here to help! You can ask me about:\n\n• Navigating the dashboard\n• Creating projects or invoices\n• Managing clients and teams\n• Using the calendar or tasks\n• Any features in the workflow suite"
    } else if (input.includes('hi') || input.includes('hello')) {
      aiResponse = "Hello! How can I assist you with your workflow today?"
    } else {
      aiResponse = `I understand you're asking about: "${userInput}". While I'm in demo mode, I can help you navigate the suite and answer questions about features. What would you like to know more about?`
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiMessage])
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-[var(--z-modal-backdrop)] lg:bg-transparent lg:pointer-events-none"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed right-0 top-0 h-full w-full lg:w-[400px] bg-card border-l border-border shadow-2xl z-[var(--z-modal)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-to-r from-gold/10 to-blue/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                  <Bot className="w-6 h-6 text-navy-dark" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">AI Assistant</h2>
                  <p className="text-xs text-muted-foreground">
                    {loading ? 'Thinking...' : 'Online'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Close AI Assistant"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <MessageList messages={messages} />
              {loading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-muted/30">
              <MessageInput
                value={input}
                onChange={setInput}
                onSend={sendMessage}
                disabled={loading}
                placeholder="Ask me anything about your workflow..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
