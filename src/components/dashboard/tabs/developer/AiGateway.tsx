'use client'

import { motion } from "framer-motion"
import { Brain, Cloud, Shield, Zap } from "lucide-react"

const routes = [
  { id: "ai1", name: "Inference Gateway", status: "healthy", rpm: 180, latency: "120ms" },
  { id: "ai2", name: "Embeddings", status: "healthy", rpm: 95, latency: "95ms" },
  { id: "ai3", name: "Guardrails", status: "warning", rpm: 60, latency: "160ms" },
]

const statusColor: Record<string, string> = {
  healthy: "bg-green-500/10 text-green-300",
  warning: "bg-amber-500/10 text-amber-200",
  down: "bg-red-500/10 text-red-200",
}

export function AiGatewayPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
          <Brain className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Gateway</h3>
          <p className="text-sm text-muted-foreground">Model routing and guardrails</p>
        </div>
      </div>

      <div className="space-y-3">
        {routes.map((route, idx) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + idx * 0.05 }}
            className="rounded-xl border border-white/10 bg-navy/60 p-4 flex items-center justify-between gap-3"
          >
            <div>
              <p className="font-semibold text-foreground">{route.name}</p>
              <p className="text-xs text-muted-foreground">{route.id}</p>
            </div>
            <div className="text-right space-y-1">
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusColor[route.status] || "bg-white/10 text-white"}`}>
                <Shield className="h-3.5 w-3.5" />
                {route.status}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-white/5 text-foreground">
                <Cloud className="h-3.5 w-3.5 text-gold" />
                {route.rpm} rpm
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-white/5 text-foreground">
                <Zap className="h-3.5 w-3.5 text-gold" />
                {route.latency}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

