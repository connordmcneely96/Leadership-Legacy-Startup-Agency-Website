import { Message } from './Message'
import type { Message as MessageType } from './ChatPanel'

interface MessageListProps {
  messages: MessageType[]
}

/**
 * MessageList Component
 *
 * Displays the conversation history with proper styling for user and AI messages.
 */
export function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
          <span className="text-3xl">👋</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Welcome to AI Assistant
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Ask me anything about navigating the workflow suite, managing projects, or using features!
        </p>
      </div>
    )
  }

  return (
    <>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </>
  )
}
