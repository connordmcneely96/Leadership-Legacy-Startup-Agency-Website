import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, Users } from 'lucide-react'

/**
 * Calendar Page
 *
 * Event and schedule management.
 * Features:
 * - Month/week/day view toggles
 * - Mini calendar in sidebar
 * - Event cards with color coding
 * - New event modal trigger
 */
export default function CalendarPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Secondary Sidebar - Mini Calendar */}
      <aside className="w-80 border-r border-border bg-card p-4 overflow-y-auto">
        <div className="mb-6">
          <button className="w-full flex items-center gap-2 px-4 py-3 bg-gold hover:bg-gold-light text-navy-dark rounded-lg transition-all hover:scale-105 mb-4">
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">New Event</span>
          </button>
        </div>

        {/* Mini Calendar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">December 2024</h3>
            <div className="flex items-center gap-1">
              <button className="p-1 hover:bg-muted rounded transition-colors">
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="p-1 hover:bg-muted rounded transition-colors">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          <MiniCalendar />
        </div>

        {/* Upcoming Events */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <UpcomingEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-[1600px] mx-auto">
          {/* View Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-foreground">December 2024</h1>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ViewToggle label="Month" active />
              <ViewToggle label="Week" />
              <ViewToggle label="Day" />
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-border">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-3 text-center text-sm font-semibold text-muted-foreground bg-muted/50">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day) => (
                <CalendarDay key={day.id} day={day} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Mini Calendar Component
 */
function MiniCalendar() {
  return (
    <div className="grid grid-cols-7 gap-1">
      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
        <div key={i} className="text-center text-xs font-medium text-muted-foreground py-1">
          {day}
        </div>
      ))}
      {Array.from({ length: 35 }, (_, i) => {
        const dayNum = i - 3
        const isToday = dayNum === 15
        return (
          <button
            key={i}
            className={`aspect-square text-xs rounded hover:bg-muted transition-colors ${
              dayNum < 1 || dayNum > 31 ? 'text-muted-foreground/30' : 'text-foreground'
            } ${isToday ? 'bg-gold text-navy-dark font-bold' : ''}`}
          >
            {dayNum > 0 && dayNum <= 31 ? dayNum : ''}
          </button>
        )
      })}
    </div>
  )
}

/**
 * Upcoming Event Card
 */
interface Event {
  id: string
  title: string
  time: string
  color: string
  attendees?: number
}

const upcomingEvents: Event[] = [
  { id: '1', title: 'Team Standup', time: '9:00 AM', color: 'blue', attendees: 8 },
  { id: '2', title: 'Client Meeting', time: '2:00 PM', color: 'gold', attendees: 3 },
  { id: '3', title: 'Design Review', time: '4:30 PM', color: 'green' },
]

function UpcomingEventCard({ event }: { event: Event }) {
  const colorClasses = {
    blue: 'border-l-blue bg-blue/5',
    gold: 'border-l-gold bg-gold/5',
    green: 'border-l-green-500 bg-green-500/5',
  }

  return (
    <div className={`p-3 rounded-lg border-l-4 ${colorClasses[event.color as keyof typeof colorClasses]}`}>
      <p className="text-sm font-medium text-foreground mb-1">{event.title}</p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {event.time}
        </div>
        {event.attendees && (
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {event.attendees}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * View Toggle Component
 */
function ViewToggle({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active ? 'bg-gold text-navy-dark' : 'bg-muted text-foreground hover:bg-muted-foreground/10'
      }`}
    >
      {label}
    </button>
  )
}

/**
 * Calendar Day Component
 */
interface CalendarDayData {
  id: string
  date: number
  events: { id: string; title: string; color: string }[]
  isToday?: boolean
  isCurrentMonth?: boolean
}

const calendarDays: CalendarDayData[] = Array.from({ length: 35 }, (_, i) => {
  const date = i - 3
  return {
    id: `day-${i}`,
    date,
    isCurrentMonth: date > 0 && date <= 31,
    isToday: date === 15,
    events: date === 15 ? [
      { id: 'e1', title: 'Team Standup', color: 'blue' },
      { id: 'e2', title: 'Client Meeting', color: 'gold' },
    ] : date === 16 ? [
      { id: 'e3', title: 'Design Review', color: 'green' },
    ] : [],
  }
})

function CalendarDay({ day }: { day: CalendarDayData }) {
  return (
    <button
      className={`min-h-[120px] p-3 border-r border-b border-border hover:bg-muted/30 transition-colors text-left ${
        !day.isCurrentMonth ? 'bg-muted/20' : ''
      }`}
    >
      <div
        className={`text-sm font-medium mb-2 ${
          day.isToday
            ? 'w-7 h-7 flex items-center justify-center rounded-full bg-gold text-navy-dark'
            : day.isCurrentMonth
            ? 'text-foreground'
            : 'text-muted-foreground'
        }`}
      >
        {day.isCurrentMonth ? day.date : ''}
      </div>
      <div className="space-y-1">
        {day.events.map((event) => {
          const colorClasses = {
            blue: 'bg-blue/20 text-blue border-l-blue',
            gold: 'bg-gold/20 text-gold border-l-gold',
            green: 'bg-green-500/20 text-green-500 border-l-green-500',
          }
          return (
            <div
              key={event.id}
              className={`text-xs p-1 pl-2 rounded border-l-2 ${colorClasses[event.color as keyof typeof colorClasses]} truncate`}
            >
              {event.title}
            </div>
          )
        })}
      </div>
    </button>
  )
}
