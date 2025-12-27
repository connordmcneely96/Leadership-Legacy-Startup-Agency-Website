'use client'

import { useEffect } from 'react'

export type FabActionDetail = {
  context: string
  actionKey: string
}

type Handler = (detail: FabActionDetail) => void

/**
 * Subscribes to universal FAB actions emitted via CustomEvent('suite:fab-action').
 * Pass a map of actionKey → handler; keys should match UniversalFAB action keys.
 */
export function useFabActionListener(handlers: Record<string, Handler>) {
  useEffect(() => {
    const listener = (event: Event) => {
      const custom = event as CustomEvent<FabActionDetail>
      const action = custom.detail?.actionKey
      if (!action) return
      const fn = handlers[action]
      if (fn) {
        fn(custom.detail)
      }
    }

    window.addEventListener('suite:fab-action', listener as EventListener)
    return () => window.removeEventListener('suite:fab-action', listener as EventListener)
  }, [handlers])
}

