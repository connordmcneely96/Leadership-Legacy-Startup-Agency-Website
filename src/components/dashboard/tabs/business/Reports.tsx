'use client'

import { motion } from "framer-motion"
import { BarChart3, Download, FileText, RefreshCw } from "lucide-react"
import { formatDate } from "@/lib/utils"

const reports = [
  { id: "r1", title: "Financial Overview", period: "Nov 2025", updatedAt: "2025-12-05" },
  { id: "r2", title: "Client Health", period: "Q4 2025", updatedAt: "2025-12-10" },
  { id: "r3", title: "Project Delivery", period: "Dec 2025", updatedAt: "2025-12-15" },
]

export function ReportsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Reports</h3>
            <p className="text-sm text-muted-foreground">Exports and analytics packs</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-foreground hover:text-gold transition">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="space-y-3">
        {reports.map((report, idx) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + idx * 0.05 }}
            className="rounded-xl border border-white/10 bg-navy/60 p-4 flex items-center justify-between gap-3"
          >
            <div>
              <p className="text-sm font-semibold text-foreground">{report.title}</p>
              <p className="text-xs text-muted-foreground">{report.period}</p>
              <p className="text-xs text-muted-foreground">Updated {formatDate(report.updatedAt)}</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-2 text-xs font-semibold text-navy hover:bg-gold-light transition">
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

