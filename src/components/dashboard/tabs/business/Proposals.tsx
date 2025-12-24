'use client'

import { motion } from "framer-motion"
import { ArrowRight, ClipboardList, FilePlus, Filter } from "lucide-react"
import { cn, formatCurrency, formatDate } from "@/lib/utils"

const proposals = [
  { id: "pr1", client: "Tech Corp", status: "SENT", total: 42000, validUntilDate: "2025-01-05" },
  { id: "pr2", client: "Finance Inc", status: "VIEWED", total: 38000, validUntilDate: "2025-01-08" },
  { id: "pr3", client: "Startup XYZ", status: "DRAFT", total: 18000, validUntilDate: "2025-01-12" },
  { id: "pr4", client: "HealthPlus", status: "ACCEPTED", total: 52000, validUntilDate: "2025-01-15" },
]

const statusColor: Record<string, string> = {
  SENT: "bg-cyan-500/10 text-cyan-200",
  VIEWED: "bg-blue-500/10 text-blue-200",
  DRAFT: "bg-gray-500/10 text-gray-200",
  ACCEPTED: "bg-green-500/10 text-green-200",
  REJECTED: "bg-red-500/10 text-red-200",
}

export function ProposalsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Proposals</h3>
            <p className="text-sm text-muted-foreground">Pipeline of offers and decisions</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-foreground hover:text-gold transition">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-2 text-sm font-semibold text-navy hover:bg-gold-light transition">
            <FilePlus className="h-4 w-4" />
            New proposal
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {proposals.map((proposal, idx) => (
          <motion.div
            key={proposal.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + idx * 0.05 }}
            className="rounded-xl border border-white/10 bg-navy/60 p-4 flex items-center justify-between gap-3 hover:border-gold/40 transition"
          >
            <div>
              <p className="text-sm font-semibold text-foreground">{proposal.client}</p>
              <p className="text-xs text-muted-foreground">Valid until {formatDate(proposal.validUntilDate)}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-lg font-bold text-gold">{formatCurrency(proposal.total)}</p>
              <div className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold", statusColor[proposal.status] || "bg-white/10 text-white")}>
                {proposal.status}
              </div>
              <button className="inline-flex items-center gap-1 text-gold hover:text-gold-light text-xs font-semibold">
                View proposal
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

