'use client'

import { useMemo } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Filter, Plus, Search, Users } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"

const clients = [
  { id: "c1", name: "Tech Corp", email: "ops@techcorp.com", company: "Tech Corp", totalSpent: 128000, projectCount: 4, satisfaction: 92 },
  { id: "c2", name: "Finance Inc", email: "cto@financeinc.com", company: "Finance Inc", totalSpent: 98000, projectCount: 3, satisfaction: 88 },
  { id: "c3", name: "Startup XYZ", email: "founder@startupxyz.com", company: "Startup XYZ", totalSpent: 42000, projectCount: 2, satisfaction: 90 },
  { id: "c4", name: "HealthPlus", email: "it@healthplus.com", company: "HealthPlus", totalSpent: 56000, projectCount: 2, satisfaction: 86 },
]

export function ClientsPanel() {
  const totalValue = useMemo(() => clients.reduce((sum, c) => sum + c.totalSpent, 0), [])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Clients</h3>
            <p className="text-sm text-muted-foreground">Relationship and value overview</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-foreground hover:text-gold transition">
            <Search className="h-4 w-4" />
            Search
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-foreground hover:text-gold transition">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-2 text-sm font-semibold text-navy hover:bg-gold-light transition">
            <Plus className="h-4 w-4" />
            New client
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg">
          <p className="text-sm text-muted-foreground">Total value</p>
          <p className="text-3xl font-bold text-foreground">{formatCurrency(totalValue)}</p>
          <p className="text-xs text-muted-foreground mt-1">Across {clients.length} clients</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg">
          <p className="text-sm text-muted-foreground">Avg satisfaction</p>
          <p className="text-3xl font-bold text-foreground">
            {(clients.reduce((sum, c) => sum + c.satisfaction, 0) / clients.length).toFixed(1)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">NPS-style pulse</p>
        </div>
      </div>

      <div className="space-y-3">
        {clients.map((client, idx) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + idx * 0.05 }}
            className="rounded-xl border border-white/10 bg-navy/60 p-4 flex items-center justify-between gap-3 hover:border-gold/40 transition"
          >
            <div>
              <p className="font-semibold text-foreground">{client.name}</p>
              <p className="text-xs text-muted-foreground">{client.email}</p>
              <p className="text-xs text-muted-foreground">{client.company}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm font-semibold text-gold">{formatCurrency(client.totalSpent)}</p>
              <p className="text-xs text-muted-foreground">{client.projectCount} active projects</p>
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
                  client.satisfaction >= 90
                    ? "bg-green-500/10 text-green-300"
                    : client.satisfaction >= 85
                    ? "bg-blue-500/10 text-blue-200"
                    : "bg-orange-500/10 text-orange-200"
                )}
              >
                {client.satisfaction}% satisfaction
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

