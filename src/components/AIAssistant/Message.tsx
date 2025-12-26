import { Bot, User as UserIcon } from 'lucide-react'
import type { Message as MessageType } from './ChatPanel'

interface MessageProps {
  message: MessageType
}

/**
 * Message Component
 *
 * Individual message display with role-based styling.
 * - User messages: Right-aligned, navy background
 * - AI messages: Left-aligned, light gray background
 * - Supports markdown-like formatting
 */
export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'

  if (message.role === 'system') {
    return (
      <div className="flex justify-center">
        <p className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {message.content}
        </p>
      </div>
    )
  }

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-navy border-2 border-gold'
            : 'bg-gradient-to-br from-gold to-gold-light'
        }`}
      >
        {isUser ? (
          <UserIcon className="w-4 h-4 text-gold" />
        ) : (
          <Bot className="w-4 h-4 text-navy-dark" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`flex flex-col gap-1 max-w-[75%] ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-navy text-white rounded-tr-sm'
              : 'bg-muted text-foreground rounded-tl-sm'
          }`}
        >
          <div className="text-sm whitespace-pre-wrap break-words">
            {formatMessage(message.content)}
          </div>
        </div>

        {/* Timestamp */}
        <span className="text-xs text-muted-foreground px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}

/**
 * Format message content with basic markdown-like support
 */
function formatMessage(content: string) {
  // Split by newlines to preserve formatting
  const lines = content.split('\n')

  return lines.map((line, index) => {
    // Bold text (**text**)
    let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

    // Italic text (*text*)
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Bullet points
    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      return (
        <div key={index} className="flex gap-2">
          <span>•</span>
          <span dangerouslySetInnerHTML={{ __html: formatted.replace(/^[•-]\s*/, '') }} />
        </div>
      )
    }

    // Numbered lists
    if (/^\d+\./.test(line.trim())) {
      return <div key={index} dangerouslySetInnerHTML={{ __html: formatted }} />
    }

    return (
      <div key={index} dangerouslySetInnerHTML={{ __html: formatted || '<br />' }} />
    )
  })
}

/**
 * Format timestamp to human-readable format
 */
function formatTime(timestamp: Date): string {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`

  return timestamp.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}
