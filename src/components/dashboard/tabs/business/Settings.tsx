'use client'

import { motion } from "framer-motion"
import { Bell, Lock, ShieldCheck, SlidersHorizontal, Users } from "lucide-react"

const settings = [
  { id: "roles", label: "Roles & Access", description: "Manage admin, manager, viewer roles", icon: Users },
  { id: "security", label: "Security", description: "MFA, session limits, device trust", icon: ShieldCheck },
  { id: "notifications", label: "Notifications", description: "Billing, project, and incident alerts", icon: Bell },
  { id: "billing", label: "Billing", description: "Invoice settings, tax info, payment methods", icon: Lock },
]

export function SettingsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
          <SlidersHorizontal className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Settings</h3>
          <p className="text-sm text-muted-foreground">Controls and governance</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {settings.map((item, idx) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + idx * 0.05 }}
              className="rounded-xl border border-white/10 bg-navy/60 p-4 space-y-2"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-gold" />
                <p className="font-semibold text-foreground">{item.label}</p>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <button className="text-xs font-semibold text-gold hover:text-gold-light">Open</button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

