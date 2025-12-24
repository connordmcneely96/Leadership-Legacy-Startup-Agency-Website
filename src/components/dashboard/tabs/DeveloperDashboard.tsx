'use client'

import { motion } from "framer-motion"
import { Activity, Gauge, GitBranch, Server, ShieldCheck, Zap } from "lucide-react"
import { cn, formatNumber, formatPercent } from "@/lib/utils"
import { DeploymentsPanel } from "./developer/Deployments"
import { WorkersPanel } from "./developer/Workers"
import { AiGatewayPanel } from "./developer/AiGateway"
import { StoragePanel } from "./developer/Storage"
import { DevProjectsPanel } from "./developer/Projects"
import { DevSettingsPanel } from "./developer/Settings"

const reliabilityMetrics = [
  { label: "Total requests (24h)", value: 1_240_000, change: 12, icon: Activity },
  { label: "Error rate", value: 0.02, change: -5, icon: ShieldCheck, isPercent: true },
  { label: "Avg response", value: 45, change: -8, icon: Zap, unit: "ms" },
  { label: "Active workers", value: 23, change: 3, icon: Server },
]

function TrendPill({ change }: { change: number }) {
  const positive = change >= 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold",
        positive ? "bg-green-500/10 text-green-300" : "bg-red-500/10 text-red-300"
      )}
    >
      {positive ? "+" : ""}
      {change}%
    </span>
  )
}

interface Props {
  section?: string | null
}

export default function DeveloperDashboard({ section }: Props) {
  const active = section || "deployments"

  const renderSection = () => {
    switch (active) {
      case "deployments":
        return <DeploymentsPanel />
      case "workers":
        return <WorkersPanel />
      case "ai":
        return <AiGatewayPanel />
      case "projects":
        return <DevProjectsPanel />
      case "storage":
        return <StoragePanel />
      case "settings":
        return <DevSettingsPanel />
      default:
        return <DeploymentsPanel />
    }
  }

  return (
    <div className="relative p-8 md:p-10 lg:p-12 space-y-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-gold/8 pointer-events-none" />
      <div className="relative space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-gold uppercase tracking-[0.2em]">Developer metrics</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Infrastructure, deployments, code health</h2>
            <p className="text-muted-foreground max-w-3xl">
              Adapted from the developer dashboard repo with Cloudflare-oriented signals. Cards stay mounted across tabs to preserve context.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-foreground hover:border-gold hover:text-gold transition">
            Open runbooks
            <GitBranch className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reliabilityMetrics.map((metric, idx) => {
            const Icon = metric.icon
            const value = metric.isPercent ? formatPercent(metric.value * 100, 2) : metric.unit ? `${metric.value}${metric.unit}` : formatNumber(metric.value)
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 shadow-xl"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-xl bg-white/10 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <TrendPill change={metric.change} />
                </div>
                <div className="mt-5 space-y-1">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{metric.label}</p>
                  <p className="text-3xl font-bold text-foreground">{value}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 shadow-2xl space-y-6">{renderSection()}</div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-gold/15 via-white/5 to-blue-500/10 p-6 shadow-2xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Fast tab switching</p>
              <h3 className="text-xl font-semibold text-foreground">Stateful cards for deployments, workers, AI gateway, storage, and more.</h3>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-foreground hover:border-gold hover:text-gold border border-white/10 transition">
                Export snapshot
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy hover:bg-gold-light transition">
                View incidents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

