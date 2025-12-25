import { Video, Calendar, Users, Plus, Clock, ExternalLink } from 'lucide-react'

/**
 * Meet Page
 *
 * Video conferencing interface placeholder.
 * Features:
 * - Quick start meeting
 * - Upcoming meetings list
 * - Join meeting by code
 * - Integration placeholder for future video platform
 */
export default function MeetPage() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Meet</h1>
        <p className="text-muted-foreground">Video conferencing and virtual meetings</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Start Meeting */}
        <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-full bg-gold/10">
              <Video className="w-8 h-8 text-gold" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Start a Meeting</h2>
              <p className="text-sm text-muted-foreground">Begin an instant meeting</p>
            </div>
          </div>
          <button className="w-full px-6 py-3 bg-gold hover:bg-gold-light text-navy-dark font-medium rounded-lg transition-all hover:scale-105">
            New Meeting
          </button>
        </div>

        {/* Join Meeting */}
        <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-full bg-blue/10">
              <Users className="w-8 h-8 text-blue" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Join a Meeting</h2>
              <p className="text-sm text-muted-foreground">Enter meeting code or link</p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter meeting code"
              className="flex-1 px-4 py-3 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:border-gold"
            />
            <button className="px-6 py-3 bg-blue hover:bg-blue-light text-white font-medium rounded-lg transition-all">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Upcoming Meetings</h2>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-lg transition-colors text-sm">
            <Calendar className="w-4 h-4" />
            View Calendar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      </div>

      {/* Integration Notice */}
      <div className="bg-gradient-to-r from-gold/10 to-blue/10 border border-gold/20 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-gold/20">
            <ExternalLink className="w-6 h-6 text-gold" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Video Platform Integration
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your preferred video conferencing platform (Zoom, Google Meet, Microsoft Teams)
              to enable seamless meeting creation and management.
            </p>
            <button className="px-4 py-2 bg-gold hover:bg-gold-light text-navy-dark rounded-lg text-sm font-medium transition-all">
              Configure Integration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Meeting Card Component
 */
interface Meeting {
  id: string
  title: string
  time: string
  duration: string
  attendees: number
  host: string
}

const upcomingMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Team Standup',
    time: 'Today at 9:00 AM',
    duration: '15 min',
    attendees: 8,
    host: 'Sarah Chen',
  },
  {
    id: '2',
    title: 'Client Presentation',
    time: 'Today at 2:00 PM',
    duration: '1 hour',
    attendees: 5,
    host: 'You',
  },
  {
    id: '3',
    title: 'Design Review',
    time: 'Tomorrow at 10:30 AM',
    duration: '45 min',
    attendees: 6,
    host: 'Mike Johnson',
  },
  {
    id: '4',
    title: 'Weekly All-Hands',
    time: 'Friday at 3:00 PM',
    duration: '1 hour',
    attendees: 24,
    host: 'Leadership Team',
  },
]

function MeetingCard({ meeting }: { meeting: Meeting }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-gold transition-colors">
            {meeting.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {meeting.time}
            </div>
            <span>•</span>
            <span>{meeting.duration}</span>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-gold/10">
          <Video className="w-5 h-5 text-gold" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{meeting.attendees} attendees</span>
          <span>•</span>
          <span>Host: {meeting.host}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border flex gap-2">
        <button className="flex-1 px-4 py-2 bg-gold hover:bg-gold-light text-navy-dark rounded-lg text-sm font-medium transition-all">
          Join
        </button>
        <button className="px-4 py-2 bg-muted hover:bg-muted-foreground/10 text-foreground rounded-lg text-sm font-medium transition-all">
          Details
        </button>
      </div>
    </div>
  )
}
