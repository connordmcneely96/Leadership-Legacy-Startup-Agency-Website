'use client'

import { motion } from "framer-motion"
import { Database, HardDrive, Inbox, PieChart } from "lucide-react"

const storage = [
  { id: "r2", name: "R2 Assets", usage: 62, detail: "Media + docs", trend: "+3%" },
  { id: "kv", name: "KV Config", usage: 38, detail: "Feature flags", trend: "+1%" },
  { id: "d1", name: "D1 Database", usage: 71, detail: "App data", trend: "+4%" },
  { id: "queues", name: "Queues", usage: 44, detail: "Async jobs", trend: "+2%" },
]

export function StoragePanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
          <HardDrive className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Storage</h3>
          <p className="text-sm text-muted-foreground">R2, KV, D1, Queues</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {storage.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + idx * 0.05 }}
            className="rounded-xl border border-white/10 bg-navy/60 p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-foreground">
                <PieChart className="h-3.5 w-3.5 text-gold" />
                {item.trend}
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light" style={{ width: `${item.usage}%` }} />
            </div>
            <p className="text-xs text-muted-foreground">Usage {item.usage}%</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

