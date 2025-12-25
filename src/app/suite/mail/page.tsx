import { Mail, Inbox, Send, Star, Trash2, Plus, Search, Paperclip, Calendar } from 'lucide-react'

/**
 * Mail Page
 *
 * Email client interface.
 * Features:
 * - Three-column layout (folders, list, preview)
 * - Compose button
 * - Inbox/sent/drafts/trash folders
 * - Email preview cards
 */
export default function MailPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Folder Sidebar */}
      <aside className="w-64 border-r border-border bg-card p-4 overflow-y-auto">
        <button className="w-full flex items-center gap-2 px-4 py-3 bg-gold hover:bg-gold-light text-navy-dark rounded-lg transition-all hover:scale-105 mb-6">
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">Compose</span>
        </button>

        <div className="space-y-1">
          <FolderButton icon={Inbox} label="Inbox" count={12} active />
          <FolderButton icon={Star} label="Starred" count={3} />
          <FolderButton icon={Send} label="Sent" />
          <FolderButton icon={Mail} label="Drafts" count={2} />
          <FolderButton icon={Trash2} label="Trash" />
        </div>
      </aside>

      {/* Email List */}
      <div className="w-96 border-r border-border bg-card overflow-y-auto">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search mail..."
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <div className="divide-y divide-border">
          {mockEmails.map((email) => (
            <EmailListItem key={email.id} email={email} />
          ))}
        </div>
      </div>

      {/* Email Preview */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-[900px] mx-auto">
          <EmailPreview />
        </div>
      </div>
    </div>
  )
}

/**
 * Folder Button Component
 */
interface FolderButtonProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  count?: number
  active?: boolean
}

function FolderButton({ icon: Icon, label, count, active }: FolderButtonProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
        active
          ? 'bg-gold/10 text-gold border border-gold/20'
          : 'text-foreground hover:bg-muted'
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium flex-1">{label}</span>
      {count && (
        <span className="text-xs font-semibold px-2 py-0.5 bg-gold/20 text-gold rounded-full">
          {count}
        </span>
      )}
    </button>
  )
}

/**
 * Email List Item Component
 */
interface EmailData {
  id: string
  sender: string
  subject: string
  preview: string
  time: string
  unread?: boolean
  starred?: boolean
  hasAttachment?: boolean
}

const mockEmails: EmailData[] = [
  {
    id: '1',
    sender: 'Sarah Chen',
    subject: 'Q4 Product Roadmap Review',
    preview: "Hi team, I've attached the updated roadmap for Q4. Please review...",
    time: '10:30 AM',
    unread: true,
    hasAttachment: true,
  },
  {
    id: '2',
    sender: 'Mike Johnson',
    subject: 'Client Meeting Follow-up',
    preview: 'Thanks for joining the call today. Here are the key takeaways...',
    time: '9:15 AM',
    unread: true,
    starred: true,
  },
  {
    id: '3',
    sender: 'Design Team',
    subject: 'New Brand Assets Available',
    preview: 'The updated brand guidelines and assets are now available in...',
    time: 'Yesterday',
  },
  {
    id: '4',
    sender: 'Finance Department',
    subject: 'Monthly Expense Report',
    preview: 'Please find attached your monthly expense report for review...',
    time: 'Yesterday',
    hasAttachment: true,
  },
  {
    id: '5',
    sender: 'HR Team',
    subject: 'Team Building Event - Save the Date',
    preview: "We're excited to announce our upcoming team building event...",
    time: '2 days ago',
  },
]

function EmailListItem({ email }: { email: EmailData }) {
  return (
    <button
      className={`w-full p-4 hover:bg-muted/50 transition-colors text-left ${
        email.unread ? 'bg-muted/30' : ''
      }`}
    >
      <div className="flex items-start gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className={`text-sm truncate ${email.unread ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'}`}>
              {email.sender}
            </p>
            {email.starred && <Star className="w-4 h-4 text-gold fill-gold flex-shrink-0" />}
            {email.hasAttachment && <Paperclip className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
          </div>
          <p className={`text-sm mb-1 truncate ${email.unread ? 'font-semibold text-foreground' : 'text-foreground'}`}>
            {email.subject}
          </p>
          <p className="text-xs text-muted-foreground truncate">{email.preview}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{email.time}</p>
    </button>
  )
}

/**
 * Email Preview Component
 */
function EmailPreview() {
  return (
    <div>
      {/* Email Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Q4 Product Roadmap Review
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <span className="text-navy-dark font-semibold text-sm">SC</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Sarah Chen</p>
                <p className="text-xs text-muted-foreground">sarah.chen@example.com</p>
              </div>
              <p className="text-sm text-muted-foreground">10:30 AM</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pb-6 border-b border-border">
          <button className="px-4 py-2 bg-gold hover:bg-gold-light text-navy-dark rounded-lg text-sm font-medium transition-all">
            Reply
          </button>
          <button className="px-4 py-2 bg-muted hover:bg-muted-foreground/10 text-foreground rounded-lg text-sm font-medium transition-all">
            Forward
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Star className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Trash2 className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Email Body */}
      <div className="prose prose-invert max-w-none">
        <p className="text-foreground mb-4">Hi team,</p>
        <p className="text-foreground mb-4">
          I've attached the updated product roadmap for Q4. Please review the timeline and
          milestones before our meeting tomorrow.
        </p>
        <p className="text-foreground mb-4">Key highlights:</p>
        <ul className="text-foreground mb-4 space-y-2">
          <li>New feature releases scheduled for October and November</li>
          <li>Performance optimization sprint in mid-October</li>
          <li>User testing phase beginning in November</li>
          <li>Year-end release candidate by December 15th</li>
        </ul>
        <p className="text-foreground mb-4">
          Please let me know if you have any questions or concerns.
        </p>
        <p className="text-foreground mb-4">
          Best regards,
          <br />
          Sarah
        </p>
      </div>

      {/* Attachments */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h3 className="text-sm font-semibold text-foreground mb-3">Attachments</h3>
        <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:border-gold/50 transition-colors cursor-pointer">
          <div className="p-2 rounded bg-gold/10">
            <Paperclip className="w-5 h-5 text-gold" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Q4-Product-Roadmap.pdf</p>
            <p className="text-xs text-muted-foreground">2.4 MB</p>
          </div>
        </div>
      </div>
    </div>
  )
}
