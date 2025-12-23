'use client'

import { motion } from "framer-motion"
import {
  Activity,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  Globe,
  Leaf,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react"
import { cn, formatNumber, formatPercent } from "@/lib/utils"

const reliabilityMetrics = [
  { label: "Total requests (24h)", value: 1_240_000, change: 12, icon: Activity },
  { label: "Error rate", value: 0.02, change: -5, icon: ShieldCheck, isPercent: true },
  { label: "Avg response", value: 45, change: -8, icon: Zap, unit: "ms" },
  { label: "Active workers", value: 23, change: 3, icon: Server },
]

const deployments = [
  { id: "deploy-001", name: "Production API", status: "active", uptime: "99.9%" },
  { id: "deploy-002", name: "Staging", status: "deploying", uptime: "—" },
  { id: "deploy-003", name: "Beta", status: "active", uptime: "98.7%" },
]

const recentBuilds = [
  { id: "build-001", version: "v2.3.1", status: "success", timestamp: "2h ago", duration: "2m 14s" },
  { id: "build-002", version: "v2.3.0", status: "success", timestamp: "5h ago", duration: "2m 08s" },
  { id: "build-003", version: "v2.2.9", status: "failed", timestamp: "1d ago", duration: "1m 52s" },
  { id: "build-004", version: "v2.2.8", status: "success", timestamp: "2d ago", duration: "2m 19s" },
]

const resourceUsage = [
  { label: "Workers CPU", value: 68, accent: "from-blue-400 to-cyan-300" },
  { label: "KV Reads", value: 74, accent: "from-gold to-gold-light" },
  { label: "R2 Egress", value: 41, accent: "from-emerald-400 to-green-300" },
  { label: "Queues", value: 56, accent: "from-orange-400 to-amber-300" },
]

const performanceBreakdown = [
  { label: "p50 latency", value: "45ms", change: -4 },
  { label: "p95 latency", value: "88ms", change: -2 },
  { label: "Cache hit rate", value: "92%", change: 3 },
  { label: "Deploy success", value: "97%", change: 1 },
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

function StatusDot({ status }: { status: string }) {
  const palette: Record<string, string> = {
    active: "bg-green-400",
    deploying: "bg-amber-400",
    failed: "bg-red-400",
  }
  return <span className={cn("h-2.5 w-2.5 rounded-full inline-block", palette[status] ?? "bg-gray-400")} />
}

export default function DeveloperDashboard() {
  return (
    <div className="relative p-8 md:p-10 lg:p-12 space-y-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-gold/8 pointer-events-none" />
      <div className="relative space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-gold uppercase tracking-[0.2em]">Developer metrics</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Infrastructure, deployments, code health</h2>
            <p className="text-muted-foreground max-w-3xl">
              Adapted from the developer dashboard repo with Cloudflare-oriented signals. Cards stay mounted as you hop
              between tabs to keep context.
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

        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-gold" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Cloudflare edge health</h3>
                <p className="text-sm text-muted-foreground">Deployments and uptime snapshots.</p>
              </div>
            </div>
            <div className="space-y-3">
              {deployments.map((deployment, idx) => (
                <motion.div
                  key={deployment.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="rounded-xl border border-white/10 bg-navy/60 p-4 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">{deployment.name}</p>
                    <p className="text-xs text-muted-foreground">{deployment.id}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-foreground">
                      <StatusDot status={deployment.status} />
                      {deployment.status}
                    </div>
                    <p className="text-xs text-muted-foreground">Uptime {deployment.uptime}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-white/5 to-gold/10 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <Gauge className="h-5 w-5 text-gold" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Performance metrics</h3>
                <p className="text-sm text-muted-foreground">Latency, cache, and deploy success.</p>
              </div>
            </div>
            <div className="space-y-3">
              {performanceBreakdown.map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{metric.label}</p>
                    <p className="text-xs text-muted-foreground">Last 24h</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{metric.value}</p>
                    <TrendPill change={metric.change} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <GitBranch className="h-5 w-5 text-gold" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Recent deployments</h3>
                <p className="text-sm text-muted-foreground">Build pipeline health and throughput.</p>
              </div>
            </div>
            <div className="space-y-3">
              {recentBuilds.map((build, idx) => (
                <motion.div
                  key={build.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + idx * 0.05 }}
                  className="rounded-xl border border-white/10 bg-navy/60 p-4 flex items-center gap-4"
                >
                  <div
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold capitalize",
                      build.status === "success" && "bg-green-500/10 text-green-300",
                      build.status === "failed" && "bg-red-500/10 text-red-300"
                    )}
                  >
                    {build.status}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{build.version}</span>
                      <span className="text-xs font-mono text-muted-foreground">{build.id}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {build.timestamp} · {build.duration}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-navy/60 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-gold" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Resource usage</h3>
                <p className="text-sm text-muted-foreground">Workers, KV, R2, and queues.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {resourceUsage.map((resource, idx) => (
                <motion.div
                  key={resource.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{resource.label}</p>
                    <span className="text-xs font-semibold text-muted-foreground">{formatPercent(resource.value, 0)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={cn("h-full rounded-full bg-gradient-to-r transform-gpu", resource.accent)}
                      style={{ width: `${resource.value}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-gold/15 via-white/5 to-blue-500/10 p-6 shadow-2xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Performance-first interactions</p>
              <h3 className="text-xl font-semibold text-foreground">
                GPU-accelerated cards and preserved state keep tab switching under 100ms.
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-foreground hover:text-gold hover:border-gold border border-white/10 transition">
                Open observability
                <Cpu className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy hover:bg-gold-light transition">
                View incidents
                <Leaf className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

