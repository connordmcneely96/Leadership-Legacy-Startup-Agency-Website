'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useFabActionListener, type FabActionDetail } from '@/lib/hooks/useFabActionListener'
import { CheckCircle2 } from 'lucide-react'

type Toast = {
  id: string
  title: string
  description?: string
}

const actionRoutes: Record<string, string> = {
  'doc-blank': '/suite/documents',
  'doc-template': '/suite/documents',
  'sheet-blank': '/suite/sheets',
  'sheet-import': '/suite/sheets',
  'slides-blank': '/suite/slides',
  'slides-template': '/suite/slides',
  'drive-upload': '/suite/drive',
  'drive-folder': '/suite/drive',
  'photos-upload': '/suite/photos',
  'photos-device': '/suite/photos',
  'gallery-create': '/suite/gallery',
  'gallery-add': '/suite/gallery',
  'calendar-event': '/suite/calendar',
  'calendar-meeting': '/suite/calendar',
  'mail-compose': '/suite/mail',
  'mail-draft': '/suite/mail',
  'meet-schedule': '/suite/meet',
  'meet-instant': '/suite/meet',
  'task-create': '/suite/tasks',
  'task-quick': '/suite/tasks',
  'dash-doc': '/suite/documents',
  'dash-meeting': '/suite/meet',
  'dash-task': '/suite/tasks',
}

const friendlyLabels: Record<string, string> = {
  'doc-blank': 'New blank document',
  'doc-template': 'Document from template',
  'sheet-blank': 'New sheet',
  'sheet-import': 'Import CSV to sheet',
  'slides-blank': 'New slide deck',
  'slides-template': 'Slides from template',
  'drive-upload': 'Upload files',
  'drive-folder': 'Create folder',
  'photos-upload': 'Upload photos',
  'photos-device': 'Pick photos',
  'gallery-create': 'New album',
  'gallery-add': 'Add photos to album',
  'calendar-event': 'Create event',
  'calendar-meeting': 'Schedule meeting',
  'mail-compose': 'Compose email',
  'mail-draft': 'Save draft',
  'meet-schedule': 'Schedule meeting',
  'meet-instant': 'Instant meeting',
  'task-create': 'Create task',
  'task-quick': 'Quick task',
  'dash-doc': 'New document',
  'dash-meeting': 'Schedule meeting',
  'dash-task': 'Create task',
}

function buildToast(detail: FabActionDetail): Toast {
  const label = friendlyLabels[detail.actionKey] ?? 'Action queued'
  return {
    id: `${detail.actionKey}-${Date.now()}`,
    title: label,
    description: `Context: ${detail.context}`,
  }
}

/**
 * Global handler for FAB actions.
 * - Navigates to the relevant module when needed.
 * - Shows a lightweight glass toast to confirm receipt.
 * - Leaves room for wiring to specific modals/API flows per module.
 */
export function FabActionRouter() {
  const router = useRouter()
  const pathname = usePathname()
  const [toasts, setToasts] = useState<Toast[]>([])

  const handlers = useMemo(
    () => ({
      '*': (detail: FabActionDetail) => {
        const targetRoute = actionRoutes[detail.actionKey]
        if (targetRoute && pathname !== targetRoute) {
          router.push(targetRoute)
        }
        const toast = buildToast(detail)
        setToasts((prev) => [...prev, toast])
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toast.id))
        }, 2400)
      },
    }),
    [pathname, router]
  )

  useFabActionListener(
    new Proxy({}, {
      get: (_target, prop: string) => handlers['*'],
    })
  )

  useEffect(() => {
    // Clear toasts on route change to avoid stale notifications.
    setToasts([])
  }, [pathname])

  return (
    <div className="fixed bottom-6 left-6 z-[var(--z-popover)] space-y-2 w-[min(320px,calc(100vw-48px))]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="rounded-xl border border-border bg-white/10 backdrop-blur-md shadow-xl p-3 flex gap-3 items-start text-white"
          >
            <div className="p-2 rounded-lg bg-gold/15 text-gold mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.description && <p className="text-xs text-white/70">{toast.description}</p>}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

