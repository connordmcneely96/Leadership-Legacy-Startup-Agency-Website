import { Bot } from 'lucide-react'

/**
 * TypingIndicator Component
 *
 * Displays an animated "typing" indicator while the AI is generating a response.
 */
export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-navy-dark" />
      </div>

      {/* Typing Animation */}
      <div className="flex items-center gap-1 px-4 py-3 bg-muted rounded-2xl rounded-tl-sm">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
        <span className="ml-2 text-xs text-muted-foreground">AI is thinking...</span>
      </div>
    </div>
  )
}
