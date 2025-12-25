import { CheckSquare, Plus, Filter, Grid, List, Calendar, User } from 'lucide-react'

/**
 * Tasks Page
 *
 * Task management and kanban board.
 * Features:
 * - Kanban board OR list view toggle
 * - Task cards with metadata
 * - Add task inline input
 * - Filter by status/priority
 */
export default function TasksPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Tasks</h1>
          <p className="text-muted-foreground">Manage your tasks and projects</p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors bg-gold/10" title="Board view">
            <Grid className="w-5 h-5 text-gold" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="List view">
            <List className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors text-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* To Do Column */}
        <TaskColumn
          title="To Do"
          count={5}
          color="gray"
          tasks={mockTasks.todo}
        />

        {/* In Progress Column */}
        <TaskColumn
          title="In Progress"
          count={3}
          color="blue"
          tasks={mockTasks.inProgress}
        />

        {/* Review Column */}
        <TaskColumn
          title="Review"
          count={2}
          color="gold"
          tasks={mockTasks.review}
        />

        {/* Done Column */}
        <TaskColumn
          title="Done"
          count={8}
          color="green"
          tasks={mockTasks.done}
        />
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gold hover:bg-gold-light text-navy-dark rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center z-[var(--z-sticky)]"
        aria-label="New task"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}

/**
 * Task Column Component
 */
interface Task {
  id: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  assignee?: string
  tags?: string[]
}

interface TaskColumnProps {
  title: string
  count: number
  color: 'gray' | 'blue' | 'gold' | 'green'
  tasks: Task[]
}

const colorClasses = {
  gray: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  blue: 'bg-blue/10 text-blue border-blue/20',
  gold: 'bg-gold/10 text-gold border-gold/20',
  green: 'bg-green-500/10 text-green-500 border-green-500/20',
}

function TaskColumn({ title, count, color, tasks }: TaskColumnProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colorClasses[color]}`}>
            {count}
          </span>
        </div>
        <button className="p-1 hover:bg-muted rounded transition-colors">
          <Plus className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {/* Add Task */}
        <button className="w-full p-3 border-2 border-dashed border-border rounded-lg hover:border-gold/50 hover:bg-gold/5 transition-all text-sm text-muted-foreground hover:text-foreground">
          + Add task
        </button>
      </div>
    </div>
  )
}

/**
 * Task Card Component
 */
function TaskCard({ task }: { task: Task }) {
  const priorityColors = {
    low: 'bg-green-500/10 text-green-500',
    medium: 'bg-gold/10 text-gold',
    high: 'bg-destructive/10 text-destructive',
  }

  return (
    <button className="w-full bg-muted/30 hover:bg-muted/50 border border-border hover:border-gold/30 rounded-lg p-4 transition-all hover:shadow-md text-left group">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors flex-1 pr-2">
          {task.title}
        </h3>
        <span className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {task.tags && (
        <div className="flex items-center gap-1 mb-3 flex-wrap">
          {task.tags.map((tag, i) => (
            <span key={i} className="px-2 py-0.5 bg-blue/10 text-blue rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {task.dueDate}
          </div>
        )}
        {task.assignee && (
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {task.assignee}
          </div>
        )}
      </div>
    </button>
  )
}

/**
 * Mock Tasks Data
 */
const mockTasks = {
  todo: [
    {
      id: 't1',
      title: 'Update marketing website',
      description: 'Refresh homepage content and add new case studies',
      priority: 'high' as const,
      dueDate: 'Dec 20',
      assignee: 'You',
      tags: ['Marketing', 'Website'],
    },
    {
      id: 't2',
      title: 'Review Q4 budget',
      description: 'Analyze spending and prepare report for leadership',
      priority: 'medium' as const,
      dueDate: 'Dec 22',
      tags: ['Finance'],
    },
    {
      id: 't3',
      title: 'Schedule team interviews',
      priority: 'low' as const,
      dueDate: 'Dec 25',
      assignee: 'Sarah',
    },
  ],
  inProgress: [
    {
      id: 'ip1',
      title: 'Design new dashboard UI',
      description: 'Create mockups for the analytics dashboard redesign',
      priority: 'high' as const,
      dueDate: 'Dec 18',
      assignee: 'Mike',
      tags: ['Design', 'UI/UX'],
    },
    {
      id: 'ip2',
      title: 'Write API documentation',
      priority: 'medium' as const,
      dueDate: 'Dec 19',
      assignee: 'You',
      tags: ['Documentation'],
    },
  ],
  review: [
    {
      id: 'r1',
      title: 'Client proposal',
      description: 'Final review of enterprise client proposal',
      priority: 'high' as const,
      dueDate: 'Dec 17',
      tags: ['Sales'],
    },
    {
      id: 'r2',
      title: 'Code review PR #234',
      priority: 'medium' as const,
      assignee: 'Team',
    },
  ],
  done: [
    {
      id: 'd1',
      title: 'Launch product beta',
      priority: 'high' as const,
      tags: ['Product'],
    },
    {
      id: 'd2',
      title: 'Team onboarding session',
      priority: 'medium' as const,
    },
  ],
}
