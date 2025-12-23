'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Headset, LineChart, ShieldCheck, Sparkles, Timer } from "lucide-react"
import { cn, formatNumber, formatPercent } from "@/lib/utils"

const overviewStats = [
  { label: "Active engagements", value: 18, delta: 12, icon: Sparkles },
  { label: "Avg response time", value: "2h 14m", delta: -8, icon: Timer },
  { label: "NPS last quarter", value: formatPercent(72, 0), delta: 4, icon: LineChart },
  { label: "Security uptime", value: "99.98%", delta: 0.2, icon: ShieldCheck },
]

const quickLinks = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Book a call", href: "/#contact" },
]

const clientSignals = [
  { title: "Onboarding", detail: "New AI copilots rollout for FinServe group", status: "in-progress" as const },
  { title: "Support", detail: "24/7 support SLA refreshed for enterprise retainers", status: "healthy" as const },
  { title: "Experiments", detail: "RAG + workflow automation pilots running with 3 clients", status: "watching" as const },
]

export default function CurrentDashboard() {
  return (
    <div className="relative p-8 md:p-10 lg:p-12 space-y-8">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-blue-500/5 pointer-events-none" />
      <div className="relative space-y-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold text-gold uppercase tracking-[0.2em]">Current dashboard</p>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Client experience overview</h2>
              <p className="text-muted-foreground max-w-2xl">
                A lightweight view of the existing site content. Use the quick links to jump back into the home page
                sections without losing your place in the new dashboards.
              </p>
            </div>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy transition hover:bg-gold-light"
            >
              Talk with the team
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {overviewStats.map((stat, idx) => {
            const Icon = stat.icon
            const deltaIsPositive = typeof stat.delta === "number" ? stat.delta >= 0 : false
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gold/40 to-gold/20 text-gold flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={cn(
                      "text-xs font-semibold rounded-full px-2 py-1",
                      deltaIsPositive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                    )}
                  >
                    {deltaIsPositive ? "+" : ""}
                    {typeof stat.delta === "number" ? stat.delta : 0}%
                  </span>
                </div>
                <div className="mt-6 space-y-1">
                  <p className="text-3xl font-bold text-foreground tracking-tight">
                    {typeof stat.value === "number" ? formatNumber(stat.value) : stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-navy-light/70 to-navy/70 p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Headset className="h-5 w-5 text-gold" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Client success signals</h3>
                <p className="text-sm text-muted-foreground">Live pulses that stay mounted when you switch tabs</p>
              </div>
            </div>
            <div className="space-y-3">
              {clientSignals.map((signal) => (
                <div
                  key={signal.title}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold text-foreground">{signal.title}</p>
                    <p className="text-sm text-muted-foreground">{signal.detail}</p>
                  </div>
                  <span
                    className={cn(
                      "text-xs font-semibold rounded-full px-3 py-1",
                      signal.status === "healthy" && "bg-green-500/10 text-green-400",
                      signal.status === "in-progress" && "bg-blue-500/10 text-blue-300",
                      signal.status === "watching" && "bg-orange-500/10 text-orange-300"
                    )}
                  >
                    {signal.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-foreground mb-3">Quick links</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Jump back to the existing page anchors without reloading this dashboard.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0 px-4 py-3 text-sm font-semibold text-foreground hover:border-gold hover:text-gold transition"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

