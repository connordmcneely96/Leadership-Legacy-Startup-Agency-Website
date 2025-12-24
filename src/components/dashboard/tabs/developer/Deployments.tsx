'use client'

import { motion } from "framer-motion"
import { Clock, Hammer, Server, ShieldCheck } from "lucide-react"

const deployments = [
  { id: "deploy-001", name: "Production API", status: "active", uptime: "99.9%", updated: "2h ago" },
  { id: "deploy-002", name: "Staging", status: "deploying", uptime: "—", updated: "14m ago" },
  { id: "deploy-003", name: "Beta", status: "active", uptime: "98.7%", updated: "1d ago" },
]

const statusColor: Record<string, string> = {
  active: "bg-green-500/10 text-green-300",
  deploying: "bg-amber-500/10 text-amber-200",
  failed: "bg-red-500/10 text-red-200",
}

export function DeploymentsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
          <Hammer className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Deployments</h3>
          <p className="text-sm text-muted-foreground">Edge builds and uptime</p>
        </div>
      </div>
      <div className="space-y-3">
        {deployments.map((deployment, idx) => (
          <motion.div
            key={deployment.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + idx * 0.05 }}
            className="rounded-xl border border-white/10 bg-navy/60 p-4 flex items-center justify-between gap-3"
          >
            <div>
              <p className="font-semibold text-foreground">{deployment.name}</p>
              <p className="text-xs text-muted-foreground">{deployment.id}</p>
              <p className="text-xs text-muted-foreground">Updated {deployment.updated}</p>
            </div>
            <div className="text-right space-y-1">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-white/5 text-foreground">
                <Server className="h-3.5 w-3.5 text-gold" />
                {deployment.uptime === "—" ? "Deploying" : `Uptime ${deployment.uptime}`}
              </div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusColor[deployment.status] || "bg-white/10 text-white"}`}>
                {deployment.status === "active" ? <ShieldCheck className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                {deployment.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

