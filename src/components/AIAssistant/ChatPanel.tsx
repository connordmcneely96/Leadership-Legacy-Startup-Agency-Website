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

  // Load conversation history from API
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      loadHistory()
    }
  }, [isOpen])

  const loadHistory = async () => {
    try {
      // Determine API URL based on environment
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://leadership-legacy-api.connorpattern.workers.dev'

      const response = await fetch(
        `${apiUrl}/api/assistant/history?conversationId=${conversationId}`
      )

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.messages.length > 0) {
          const historyMessages: Message[] = data.messages.map((msg: any) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
            timestamp: new Date(msg.timestamp),
          }))
          setMessages(historyMessages)
        } else {
          // No history, show welcome message
          setMessages([{
            id: '1',
            role: 'assistant',
            content: "Hi! I'm your AI Assistant for Leadership Legacy. I can help you navigate the workflow suite, answer questions, and provide guidance on business strategy and startup growth. How can I assist you today?",
            timestamp: new Date(),
          }])
        }
      }
    } catch (error) {
      console.error('Failed to load history:', error)
      // Show welcome message on error
      setMessages([{
        id: '1',
        role: 'assistant',
        content: "Hi! I'm your AI Assistant. How can I help you today?",
        timestamp: new Date(),
      }])
    }
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
    const currentInput = input
    setInput('')
    setLoading(true)

    try {
      // Call real AI API endpoint
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://leadership-legacy-api.connorpattern.workers.dev'

      const response = await fetch(`${apiUrl}/api/assistant/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId,
          message: currentInput,
          userId: 'anonymous', // TODO: Replace with actual user ID when auth is implemented
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()

      if (data.success && data.message) {
        const aiMessage: Message = {
          id: data.message.id,
          role: 'assistant',
          content: data.message.content,
          timestamp: new Date(data.message.timestamp),
        }
        setMessages((prev) => [...prev, aiMessage])
      } else {
        throw new Error('Invalid response from API')
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
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
