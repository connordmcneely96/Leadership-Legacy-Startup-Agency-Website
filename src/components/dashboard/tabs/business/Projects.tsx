'use client'

import { motion } from "framer-motion"
import { ArrowRight, Clock, Filter, FolderKanban, Plus, Tag } from "lucide-react"
import { cn, formatDate } from "@/lib/utils"

const projects = [
  { id: "p1", name: "AI Chatbot", client: "Tech Corp", status: "IN_PROGRESS", progress: 65, deadline: "2025-01-15", tier: "PREMIUM" },
  { id: "p2", name: "RAG System", client: "Finance Inc", status: "IN_PROGRESS", progress: 40, deadline: "2025-01-20", tier: "STANDARD" },
  { id: "p3", name: "Landing Page", client: "Startup XYZ", status: "REVIEW", progress: 90, deadline: "2025-01-10", tier: "BASIC" },
  { id: "p4", name: "Graphics Package", client: "Brand Co", status: "IN_PROGRESS", progress: 50, deadline: "2025-01-18", tier: "STANDARD" },
]

const statusColors: Record<string, string> = {
  IN_PROGRESS: "bg-cyan-500/10 text-cyan-200",
  REVIEW: "bg-orange-500/10 text-orange-200",
  COMPLETED: "bg-green-500/10 text-green-200",
  INQUIRY: "bg-gray-500/10 text-gray-200",
}

export function ProjectsPanel() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
            <FolderKanban className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Projects</h3>
            <p className="text-sm text-muted-foreground">Workflow and delivery state</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-foreground hover:text-gold transition">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-2 text-sm font-semibold text-navy hover:bg-gold-light transition">
            <Plus className="h-4 w-4" />
            New project
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + idx * 0.05 }}
            className="rounded-xl border border-white/10 bg-navy/60 p-4 space-y-3 hover:border-gold/40 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">{project.client}</p>
                <h4 className="text-lg font-semibold text-foreground">{project.name}</h4>
              </div>
              <div className={cn("px-3 py-1 rounded-full text-xs font-semibold", statusColors[project.status] || "bg-white/10 text-white")}>
                {project.status.replace("_", " ")}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-cyan-200">{project.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 transform-gpu"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                Due {formatDate(project.deadline)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" />
                {project.tier}
              </span>
              <button className="inline-flex items-center gap-1 text-gold hover:text-gold-light text-xs font-semibold">
                View
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

