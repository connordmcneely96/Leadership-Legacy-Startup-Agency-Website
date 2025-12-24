'use client'

import { motion } from "framer-motion"
import { Code2, GitBranch, Rocket, Timer } from "lucide-react"

const projects = [
  { id: "dp1", name: "Edge Observability", status: "active", builds: "12", lead: "Olivia", updated: "2h ago" },
  { id: "dp2", name: "AI Gateway", status: "active", builds: "8", lead: "Mason", updated: "5h ago" },
  { id: "dp3", name: "Storage Optimizations", status: "review", builds: "5", lead: "Harper", updated: "1d ago" },
]

const statusColor: Record<string, string> = {
  active: "bg-green-500/10 text-green-300",
  review: "bg-amber-500/10 text-amber-200",
}

export function DevProjectsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
          <Code2 className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Projects</h3>
          <p className="text-sm text-muted-foreground">Builds and delivery</p>
        </div>
      </div>
      <div className="space-y-3">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + idx * 0.05 }}
            className="rounded-xl border border-white/10 bg-navy/60 p-4 flex items-center justify-between gap-3"
          >
            <div>
              <p className="font-semibold text-foreground">{project.name}</p>
              <p className="text-xs text-muted-foreground">Lead {project.lead}</p>
              <p className="text-xs text-muted-foreground">Updated {project.updated}</p>
            </div>
            <div className="text-right space-y-1">
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusColor[project.status] || "bg-white/10 text-white"}`}>
                <Rocket className="h-3.5 w-3.5" />
                {project.status}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-white/5 text-foreground">
                <GitBranch className="h-3.5 w-3.5 text-gold" />
                {project.builds} builds
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-white/5 text-foreground">
                <Timer className="h-3.5 w-3.5 text-gold" />
                CI/CD healthy
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

