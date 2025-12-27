'use client'

import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Plus,
  FileText,
  Sheet,
  Presentation,
  Upload,
  Image,
  Calendar,
  Mail,
  Video,
  CheckSquare,
  FolderPlus,
  Sparkles,
} from 'lucide-react'

type FabContext =
  | 'documents'
  | 'sheets'
  | 'slides'
  | 'drive'
  | 'photos'
  | 'gallery'
  | 'calendar'
  | 'mail'
  | 'meet'
  | 'tasks'
  | 'dashboard'

const contextConfig: Record<
  FabContext,
  {
    title: string
    description: string
    cta: string
    icon: React.ComponentType<{ className?: string }>
    actions: {
      key: string
      label: string
      description: string
      icon: React.ComponentType<{ className?: string }>
    }[]
  }
> = {
  documents: {
    title: 'Create New Document',
    description: 'Open a fresh doc with your brand templates.',
    cta: 'New Document',
    icon: FileText,
    actions: [
      { key: 'doc-blank', label: 'Blank document', description: 'Start from scratch', icon: FileText },
      { key: 'doc-template', label: 'From template', description: 'Use a saved template', icon: Sparkles },
    ],
  },
  sheets: {
    title: 'Create New Sheet',
    description: 'Start a sheet for budgets, forecasts, or KPIs.',
    cta: 'New Sheet',
    icon: Sheet,
    actions: [
      { key: 'sheet-blank', label: 'Blank sheet', description: 'Create a new grid', icon: Sheet },
      { key: 'sheet-import', label: 'Import CSV', description: 'Upload data to start', icon: Upload },
    ],
  },
  slides: {
    title: 'Create New Presentation',
    description: 'Craft slides with your pre-set story arcs.',
    cta: 'New Presentation',
    icon: Presentation,
    actions: [
      { key: 'slides-blank', label: 'Blank deck', description: 'Start a new slide deck', icon: Presentation },
      { key: 'slides-template', label: 'From template', description: 'Use a saved layout', icon: Sparkles },
    ],
  },
  drive: {
    title: 'Upload Files',
    description: 'Add files or create a new folder in Drive.',
    cta: 'Upload Files',
    icon: Upload,
    actions: [
      { key: 'drive-upload', label: 'Upload files', description: 'Drag-drop or browse', icon: Upload },
      { key: 'drive-folder', label: 'New folder', description: 'Organize instantly', icon: FolderPlus },
    ],
  },
  photos: {
    title: 'Upload Photos',
    description: 'Drop photos to auto-generate thumbnails.',
    cta: 'Upload Photos',
    icon: Image,
    actions: [
      { key: 'photos-upload', label: 'Upload photos', description: 'Supports multi-select', icon: Image },
      { key: 'photos-device', label: 'From device', description: 'Use native picker', icon: Upload },
    ],
  },
  gallery: {
    title: 'Create Album',
    description: 'Group photos into shareable albums.',
    cta: 'New Album',
    icon: FolderPlus,
    actions: [
      { key: 'gallery-create', label: 'New album', description: 'Name and create quickly', icon: FolderPlus },
      { key: 'gallery-add', label: 'Add photos', description: 'Select from library', icon: Image },
    ],
  },
  calendar: {
    title: 'New Event',
    description: 'Schedule events and sync invites instantly.',
    cta: 'Create Event',
    icon: Calendar,
    actions: [
      { key: 'calendar-event', label: 'Create event', description: 'Set time, attendees', icon: Calendar },
      { key: 'calendar-meeting', label: 'Schedule meeting', description: 'Link Meet + Mail', icon: Video },
    ],
  },
  mail: {
    title: 'Compose Email',
    description: 'Draft and send with your saved templates.',
    cta: 'Compose',
    icon: Mail,
    actions: [
      { key: 'mail-compose', label: 'Compose', description: 'Open rich editor', icon: Mail },
      { key: 'mail-draft', label: 'Save draft', description: 'Start and finish later', icon: FileText },
    ],
  },
  meet: {
    title: 'Schedule Meeting',
    description: 'Create a meeting code and notify attendees.',
    cta: 'Schedule Meeting',
    icon: Video,
    actions: [
      { key: 'meet-schedule', label: 'Schedule meeting', description: 'Pick date & time', icon: Calendar },
      { key: 'meet-instant', label: 'Instant meeting', description: 'Create code now', icon: Video },
    ],
  },
  tasks: {
    title: 'New Task',
    description: 'Add a card and assign instantly.',
    cta: 'Create Task',
    icon: CheckSquare,
    actions: [
      { key: 'task-create', label: 'Add task', description: 'Title, assignee, due', icon: CheckSquare },
      { key: 'task-quick', label: 'Quick task', description: 'Capture and triage', icon: Plus },
    ],
  },
  dashboard: {
    title: 'Quick Action',
    description: 'Start your most common workflows fast.',
    cta: 'Open Quick Menu',
    icon: Sparkles,
    actions: [
      { key: 'dash-doc', label: 'New doc', description: 'Start a document', icon: FileText },
      { key: 'dash-meeting', label: 'Schedule meeting', description: 'Send invites fast', icon: Video },
      { key: 'dash-task', label: 'Create task', description: 'Add to Kanban', icon: CheckSquare },
    ],
  },
}

/**
 * Universal Floating Action Button
 * Fixed across suite pages; context-aware label + drawer.
 */
export function UniversalFAB() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const context: FabContext = useMemo(() => {
    if (pathname.startsWith('/suite/documents')) return 'documents'
    if (pathname.startsWith('/suite/sheets')) return 'sheets'
    if (pathname.startsWith('/suite/slides')) return 'slides'
    if (pathname.startsWith('/suite/drive')) return 'drive'
    if (pathname.startsWith('/suite/photos')) return 'photos'
    if (pathname.startsWith('/suite/gallery')) return 'gallery'
    if (pathname.startsWith('/suite/calendar')) return 'calendar'
    if (pathname.startsWith('/suite/mail')) return 'mail'
    if (pathname.startsWith('/suite/meet')) return 'meet'
    if (pathname.startsWith('/suite/tasks')) return 'tasks'
    return 'dashboard'
  }, [pathname])

  const { title, description, cta, icon: Icon } = contextConfig[context]
  const actions = contextConfig[context].actions

  const emitAction = (actionKey: string) => {
    // Emit a custom event so individual modules can attach listeners without prop drilling.
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('suite:fab-action', {
          detail: { context, actionKey },
        })
      )
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="group fixed bottom-8 right-8 z-[var(--z-fixed)] w-14 h-14 rounded-full bg-gold text-navy-dark shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 flex items-center justify-center backdrop-blur-md"
        aria-label={title}
      >
        <Plus className="w-6 h-6" />
        <span className="pointer-events-none absolute -top-9 right-0 bg-card text-card-foreground text-xs px-3 py-1 rounded-full shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity">
          {cta}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[var(--z-modal-backdrop)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed bottom-10 right-10 w-full max-w-sm z-[var(--z-modal)]"
            >
              <div className="rounded-xl border border-border bg-white/10 backdrop-blur-md shadow-xl text-white">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border/60">
                  <div className="p-2 rounded-lg bg-gold/20 text-navy-dark">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="text-xs text-white/70">{description}</p>
                  </div>
                </div>

                <div className="px-5 py-4 space-y-3">
                  <div className="space-y-2">
                    {actions.map((action) => {
                      const ActionIcon = action.icon
                      return (
                        <button
                          key={action.key}
                          onClick={() => {
                            emitAction(action.key)
                            setOpen(false)
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-gold/40 hover:scale-[1.01] active:scale-95"
                        >
                          <div className="p-2 rounded-lg bg-gold/15 text-gold flex-shrink-0">
                            <ActionIcon className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold text-white">{action.label}</p>
                            <p className="text-xs text-white/70">{action.description}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  <button
                    onClick={() => {
                      emitAction(`${context}-primary`)
                      setOpen(false)
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gold text-navy-dark font-semibold transition-all hover:brightness-110 hover:scale-[1.01] active:scale-95"
                  >
                    <Icon className="w-5 h-5" />
                    {cta}
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full text-sm text-white/80 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

