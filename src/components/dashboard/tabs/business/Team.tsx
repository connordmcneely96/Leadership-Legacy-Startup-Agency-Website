'use client'

import { motion } from "framer-motion"
import { BadgeCheck, Mail, Users } from "lucide-react"
import { formatPercent } from "@/lib/utils"

const team = [
  { id: "t1", name: "Olivia", role: "Delivery Lead", workload: 82, focus: "AI Agents" },
  { id: "t2", name: "Mason", role: "Full-stack", workload: 68, focus: "RAG Systems" },
  { id: "t3", name: "Harper", role: "Design", workload: 54, focus: "Landing pages" },
  { id: "t4", name: "Noah", role: "ML Engineer", workload: 72, focus: "Model evals" },
]

export function TeamPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Team</h3>
          <p className="text-sm text-muted-foreground">Utilization and focus</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {team.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + idx * 0.05 }}
            className="rounded-xl border border-white/10 bg-navy/60 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-foreground">
                <BadgeCheck className="h-3.5 w-3.5 text-gold" />
                {formatPercent(member.workload, 0)}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Focus: {member.focus}</p>
            <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" style={{ width: `${member.workload}%` }} />
            </div>
            <button className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-gold hover:text-gold-light">
              <Mail className="h-3.5 w-3.5" />
              Message
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

