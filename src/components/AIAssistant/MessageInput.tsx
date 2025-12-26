import { Send } from 'lucide-react'
import { KeyboardEvent } from 'react'

interface MessageInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
  placeholder?: string
}

/**
 * MessageInput Component
 *
 * Text input field for sending messages to the AI Assistant.
 * Features:
 * - Multi-line support (auto-expand up to 4 lines)
 * - Enter to send, Shift+Enter for new line
 * - Send button only enabled when text is present
 * - Disabled state while waiting for AI response
 */
export function MessageInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = 'Ask me anything...',
}: MessageInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !disabled) {
        onSend()
      }
    }
  }

  const canSend = value.trim().length > 0 && !disabled

  return (
    <div className="flex items-end gap-2">
      {/* Text Input */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        rows={1}
        className={`flex-1 px-4 py-3 bg-background border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        style={{
          maxHeight: '120px', // ~4 lines
          minHeight: '48px',
        }}
        aria-label="Message input"
      />

      {/* Send Button */}
      <button
        onClick={onSend}
        disabled={!canSend}
        className={`p-3 rounded-lg transition-all ${
          canSend
            ? 'bg-gold hover:bg-gold-light text-navy-dark hover:scale-105 active:scale-95'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
        aria-label="Send message"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  )
}
