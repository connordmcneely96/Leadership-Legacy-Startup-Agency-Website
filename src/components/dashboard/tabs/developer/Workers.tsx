'use client'

import { motion } from "framer-motion"
import { Activity, Cpu, Server, Zap } from "lucide-react"
import { formatPercent } from "@/lib/utils"

const workers = [
  { id: "w1", name: "Edge API", status: "healthy", latency: "45ms", cpu: 62, requests: "420k/day" },
  { id: "w2", name: "Auth Gateway", status: "healthy", latency: "38ms", cpu: 58, requests: "310k/day" },
  { id: "w3", name: "Image Proxy", status: "warning", latency: "72ms", cpu: 71, requests: "190k/day" },
]

const statusColor: Record<string, string> = {
  healthy: "bg-green-500/10 text-green-300",
  warning: "bg-amber-500/10 text-amber-200",
  down: "bg-red-500/10 text-red-200",
}

export function WorkersPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
          <Server className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Workers</h3>
          <p className="text-sm text-muted-foreground">Runtime health and traffic</p>
        </div>
      </div>

      <div className="space-y-3">
        {workers.map((worker, idx) => (
          <motion.div
            key={worker.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + idx * 0.05 }}
            className="rounded-xl border border-white/10 bg-navy/60 p-4 flex items-center justify-between gap-3"
          >
            <div>
              <p className="font-semibold text-foreground">{worker.name}</p>
              <p className="text-xs text-muted-foreground">{worker.id}</p>
              <p className="text-xs text-muted-foreground">Latency {worker.latency}</p>
            </div>
            <div className="text-right space-y-1">
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusColor[worker.status] || "bg-white/10 text-white"}`}>
                <Activity className="h-3.5 w-3.5" />
                {worker.status}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-white/5 text-foreground">
                <Cpu className="h-3.5 w-3.5 text-gold" />
                {formatPercent(worker.cpu, 0)} CPU
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-white/5 text-foreground">
                <Zap className="h-3.5 w-3.5 text-gold" />
                {worker.requests}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

