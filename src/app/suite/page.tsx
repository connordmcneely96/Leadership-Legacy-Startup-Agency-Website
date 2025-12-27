import { Suspense } from 'react'
import {
  FileText,
  Sheet,
  Presentation,
  HardDrive,
  Image,
  Calendar,
  Mail,
  CheckSquare,
  TrendingUp,
  Clock,
  Star,
  Users,
} from 'lucide-react'

/**
 * Suite Dashboard Home Page
 *
 * Main landing page for the productivity suite.
 * Features:
 * - Welcome message with user name
 * - Quick access grid for recent files and pinned items
 * - Activity feed
 * - Storage usage indicator
 * - Quick create buttons for each app type
 */
export default function SuiteDashboard() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Welcome back, John
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your work today
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FileText}
          label="Documents"
          value="24"
          trend="+3 this week"
          color="blue"
        />
        <StatCard
          icon={CheckSquare}
          label="Tasks"
          value="12"
          trend="5 due today"
          color="gold"
        />
        <StatCard
          icon={Calendar}
          label="Events"
          value="8"
          trend="2 upcoming"
          color="green"
        />
        <StatCard
          icon={Users}
          label="Shared"
          value="16"
          trend="4 new shares"
          color="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Files */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Recent Files</h2>
              <button className="text-sm text-gold hover:text-gold-light transition-colors">
                View all
              </button>
            </div>

            <div className="space-y-3">
              <Suspense fallback={<LoadingSkeleton />}>
                <RecentFileItem
                  icon={FileText}
                  name="Q4 Marketing Strategy.doc"
                  modified="2 hours ago"
                  owner="You"
                  color="blue"
                />
                <RecentFileItem
                  icon={Sheet}
                  name="Sales Pipeline 2024.sheet"
                  modified="5 hours ago"
                  owner="Sarah Chen"
                  color="green"
                />
                <RecentFileItem
                  icon={Presentation}
                  name="Product Roadmap.slides"
                  modified="Yesterday"
                  owner="Mike Johnson"
                  color="orange"
                />
                <RecentFileItem
                  icon={FileText}
                  name="Team Meeting Notes.doc"
                  modified="Yesterday"
                  owner="You"
                  color="blue"
                />
                <RecentFileItem
                  icon={Sheet}
                  name="Budget Analysis.sheet"
                  modified="2 days ago"
                  owner="Finance Team"
                  color="green"
                />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Quick Access & Storage */}
        <div className="space-y-6">
          {/* Quick Create */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Create</h3>
            <div className="grid grid-cols-2 gap-3">
              <QuickCreateButton
                icon={FileText}
                label="Document"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/suite/documents';
                  }
                }}
              />
              <QuickCreateButton
                icon={Sheet}
                label="Sheet"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/suite/sheets';
                  }
                }}
              />
              <QuickCreateButton
                icon={Presentation}
                label="Slides"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/suite/slides';
                  }
                }}
              />
              <QuickCreateButton
                icon={Calendar}
                label="Event"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/suite/calendar';
                  }
                }}
              />
            </div>
          </div>

          {/* Storage Usage */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Storage</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Used</span>
                <span className="font-medium text-foreground">8.4 GB of 15 GB</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                  style={{ width: '56%' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <StorageBreakdown color="blue" label="Documents" size="3.2 GB" />
                <StorageBreakdown color="green" label="Sheets" size="2.1 GB" />
                <StorageBreakdown color="orange" label="Slides" size="1.8 GB" />
                <StorageBreakdown color="purple" label="Photos" size="1.3 GB" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
          <button className="text-sm text-gold hover:text-gold-light transition-colors">
            View all
          </button>
        </div>

        <div className="space-y-4">
          <ActivityItem
            icon={FileText}
            action="created"
            item="Q4 Marketing Strategy.doc"
            time="2 hours ago"
          />
          <ActivityItem
            icon={Star}
            action="starred"
            item="Sales Pipeline 2024.sheet"
            time="5 hours ago"
          />
          <ActivityItem
            icon={Users}
            action="shared"
            item="Product Roadmap.slides"
            time="Yesterday"
            detail="with Mike Johnson"
          />
          <ActivityItem
            icon={CheckSquare}
            action="completed"
            item="Review design mockups"
            time="2 days ago"
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Stat Card Component
 */
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  trend: string
  color: 'blue' | 'gold' | 'green' | 'purple'
}

function StatCard({ icon: Icon, label, value, trend, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue/10 text-blue',
    gold: 'bg-gold/10 text-gold',
    green: 'bg-green-500/10 text-green-500',
    purple: 'bg-purple-500/10 text-purple-500',
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </p>
      </div>
    </div>
  )
}

/**
 * Recent File Item Component
 */
interface RecentFileItemProps {
  icon: React.ComponentType<{ className?: string }>
  name: string
  modified: string
  owner: string
  color: 'blue' | 'green' | 'orange'
}

function RecentFileItem({ icon: Icon, name, modified, owner, color }: RecentFileItemProps) {
  const colorClasses = {
    blue: 'bg-blue/10 text-blue',
    green: 'bg-green-500/10 text-green-500',
    orange: 'bg-orange-500/10 text-orange-500',
  }

  const handleClick = () => {
    // Determine which app to open based on icon type
    const routes: Record<string, string> = {
      FileText: '/suite/documents',
      Sheet: '/suite/sheets',
      Presentation: '/suite/slides',
    };
    const route = routes[Icon.name] || '/suite/documents';
    if (typeof window !== 'undefined') {
      window.location.href = route;
    }
  };

  return (
    <button onClick={handleClick} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all group">
      <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="text-sm font-medium text-foreground truncate group-hover:text-gold transition-colors">
          {name}
        </p>
        <p className="text-xs text-muted-foreground">
          {modified} • {owner}
        </p>
      </div>
      <Star className="w-4 h-4 text-muted-foreground hover:text-gold hover:fill-gold transition-colors flex-shrink-0" />
    </button>
  )
}

/**
 * Quick Create Button Component
 */
interface QuickCreateButtonProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick?: () => void
}

function QuickCreateButton({ icon: Icon, label, onClick }: QuickCreateButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-gold/10 hover:border-gold/20 border border-transparent transition-all group"
    >
      <Icon className="w-6 h-6 text-muted-foreground group-hover:text-gold transition-colors" />
      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </button>
  )
}

/**
 * Storage Breakdown Component
 */
interface StorageBreakdownProps {
  color: 'blue' | 'green' | 'orange' | 'purple'
  label: string
  size: string
}

function StorageBreakdown({ color, label, size }: StorageBreakdownProps) {
  const colorClasses = {
    blue: 'bg-blue',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${colorClasses[color]}`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground truncate">{label}</p>
        <p className="text-xs font-medium text-foreground">{size}</p>
      </div>
    </div>
  )
}

/**
 * Activity Item Component
 */
interface ActivityItemProps {
  icon: React.ComponentType<{ className?: string }>
  action: string
  item: string
  time: string
  detail?: string
}

function ActivityItem({ icon: Icon, action, item, time, detail }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-muted/50">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">
          You <span className="text-muted-foreground">{action}</span>{' '}
          <span className="font-medium">{item}</span>
          {detail && <span className="text-muted-foreground"> {detail}</span>}
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <Clock className="w-3 h-3" />
          {time}
        </p>
      </div>
    </div>
  )
}

/**
 * Loading Skeleton Component
 */
function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 p-3">
          <div className="w-10 h-10 bg-muted rounded-lg animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
