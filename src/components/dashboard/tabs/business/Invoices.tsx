'use client'

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Clock, FileText, Plus, Receipt, Search } from "lucide-react"
import { cn, formatCurrency, formatDate } from "@/lib/utils"

const invoices = [
  { id: "i1", number: "INV-2412-0001", client: "Tech Corp", amount: 5000, status: "PAID", dueDate: "2024-12-15" },
  { id: "i2", number: "INV-2412-0002", client: "Finance Inc", amount: 3500, status: "SENT", dueDate: "2024-12-20" },
  { id: "i3", number: "INV-2412-0003", client: "Startup XYZ", amount: 2000, status: "VIEWED", dueDate: "2024-12-25" },
  { id: "i4", number: "INV-2412-0004", client: "HealthPlus", amount: 2700, status: "PARTIAL", dueDate: "2024-12-28" },
]

const statusColor: Record<string, string> = {
  PAID: "bg-green-500/10 text-green-300",
  SENT: "bg-cyan-500/10 text-cyan-200",
  VIEWED: "bg-cyan-500/10 text-cyan-200",
  PARTIAL: "bg-orange-500/10 text-orange-200",
  OVERDUE: "bg-red-500/10 text-red-200",
}

export function InvoicesPanel() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
            <Receipt className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Invoices</h3>
            <p className="text-sm text-muted-foreground">Pipeline and payments</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-foreground hover:text-gold transition">
            <Search className="h-4 w-4" />
            Search
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-2 text-sm font-semibold text-navy hover:bg-gold-light transition">
            <Plus className="h-4 w-4" />
            New invoice
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {invoices.map((invoice, idx) => (
          <motion.div
            key={invoice.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + idx * 0.05 }}
            className="rounded-xl border border-white/10 bg-navy/60 p-4 flex items-center justify-between gap-3 hover:border-gold/40 transition"
          >
            <div className="space-y-1">
              <p className="text-xs font-mono text-muted-foreground">{invoice.number}</p>
              <p className="text-sm font-semibold text-foreground">{invoice.client}</p>
              <p className="text-xs text-muted-foreground">Due {formatDate(invoice.dueDate)}</p>
            </div>
            <div className="text-right space-y-2">
              <p className="text-lg font-bold text-gold">{formatCurrency(invoice.amount)}</p>
              <div className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold", statusColor[invoice.status] || "bg-white/10 text-white")}>
                {invoice.status === "PAID" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                {invoice.status}
              </div>
              <button className="inline-flex items-center gap-1 text-gold hover:text-gold-light text-xs font-semibold">
                View details
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

