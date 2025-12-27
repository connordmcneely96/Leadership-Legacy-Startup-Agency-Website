'use client'

import { useEffect, useState } from 'react'

type UserInfo = {
  name: string
  email: string
  avatarUrl?: string
  storageUsed?: number
  storageQuota?: number
}

const USER_ID = 'demo-user'

export function FooterUserPanel() {
  const [user, setUser] = useState<UserInfo>({
    name: 'John Doe',
    email: 'john@example.com',
  })

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(`/api/storage/quota?user_id=${USER_ID}`)
        const json = await res.json()
        if (!mounted) return
        if (json?.data) {
          setUser((prev) => ({
            ...prev,
            storageUsed: json.data.storage_used,
            storageQuota: json.data.storage_quota,
          }))
        }
      } catch {
        /* ignore */
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const storageText =
    user.storageUsed !== undefined && user.storageQuota !== undefined
      ? `${formatSize(user.storageUsed)} / ${formatSize(user.storageQuota)}`
      : '—'

  return (
    <div className="fixed bottom-4 right-4 z-[var(--z-fixed)] bg-card border border-border rounded-xl shadow-xl p-3 flex items-center gap-3 backdrop-blur-md">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-navy-dark font-semibold">
        {user.name?.[0] ?? 'U'}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        <p className="text-xs text-muted-foreground">{storageText}</p>
      </div>
      <button
        className="ml-auto px-3 py-1.5 text-xs rounded-lg bg-muted hover:bg-muted/70 transition-colors"
        onClick={() => {
          // Placeholder logout; wire to KV session clear when available
          console.log('logout')
        }}
      >
        Logout
      </button>
    </div>
  )
}

function formatSize(bytes: number) {
  if (!bytes) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

