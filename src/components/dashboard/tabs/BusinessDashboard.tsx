'use client'

import { motion } from "framer-motion"
import { ArrowRight, Plus } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"
import { ClientsPanel } from "./business/Clients"
import { ProjectsPanel } from "./business/Projects"
import { InvoicesPanel } from "./business/Invoices"
import { ProposalsPanel } from "./business/Proposals"
import { ReportsPanel } from "./business/Reports"
import { TeamPanel } from "./business/Team"
import { SettingsPanel } from "./business/Settings"

type MetricColor = "gold" | "cyan" | "orange" | "green"

type FeaturedMetric = {
  id: string
  title: string
  subtitle: string
  value: string | number
  trend?: { direction: "up" | "down" | "neutral"; percentage: number }
  icon: string
  color: MetricColor
  highlighted?: boolean
}

const featuredMetrics: FeaturedMetric[] = [
  {
    id: "revenue-month",
    title: "Revenue This Month",
    subtitle: "Total income from all projects",
    value: formatCurrency(45320),
    trend: { direction: "up", percentage: 12.5 },
    icon: "💰",
    color: "gold",
    highlighted: true,
  },
  {
    id: "active-projects",
    title: "Active Projects",
    subtitle: "In progress or review",
    value: 12,
    trend: { direction: "up", percentage: 3 },
    icon: "📊",
    color: "cyan",
  },
  {
    id: "pending-invoices",
    title: "Pending Invoices",
    subtitle: "Awaiting payment or partial",
    value: formatCurrency(8450),
    trend: { direction: "down", percentage: 5 },
    icon: "📋",
    color: "orange",
  },
  {
    id: "team-utilization",
    title: "Team Utilization",
    subtitle: "Average workload",
    value: "87%",
    trend: { direction: "up", percentage: 8 },
    icon: "👥",
    color: "green",
  },
]

function MetricCard({ metric, index }: { metric: FeaturedMetric; index: number }) {
  const colors: Record<MetricColor, { bg: string; border: string; text: string }> = {
    gold: { bg: "from-gold/25 to-gold/5", border: "border-gold/40", text: "text-gold" },
    cyan: { bg: "from-cyan-400/25 to-cyan-400/10", border: "border-cyan-400/30", text: "text-cyan-200" },
    orange: { bg: "from-orange-400/20 to-orange-400/10", border: "border-orange-400/30", text: "text-orange-200" },
    green: { bg: "from-emerald-400/20 to-emerald-400/10", border: "border-emerald-400/30", text: "text-emerald-200" },
  }

  return (
    <motion.div
      key={metric.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 cursor-default transform-gpu",
        "bg-gradient-to-br backdrop-blur-xl border shadow-xl",
        colors[metric.color].bg,
        colors[metric.color].border,
        metric.highlighted && "ring-2 ring-offset-2 ring-offset-navy/50 ring-gold"
      )}
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full blur-3xl" />
      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{metric.subtitle}</p>
            <h3 className="text-xl font-semibold text-foreground">{metric.title}</h3>
          </div>
          <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-navy font-bold text-xl">
            {metric.icon}
          </div>
        </div>
        <div className={cn("text-4xl font-bold", colors[metric.color].text)}>{metric.value}</div>
        {metric.trend && (
          <div
            className={cn(
              "flex items-center gap-2 text-sm font-semibold",
              metric.trend.direction === "up" ? "text-green-300" : metric.trend.direction === "down" ? "text-red-300" : "text-gray-300"
            )}
          >
            {metric.trend.direction === "up" && <ArrowRight className="h-4 w-4 rotate-[-45deg]" />}
            {metric.trend.direction === "down" && <ArrowRight className="h-4 w-4 rotate-[135deg]" />}
            {metric.trend.percentage}% vs last month
          </div>
        )}
      </div>
    </motion.div>
  )
}

interface Props {
  section?: string | null
}

export default function BusinessDashboard({ section }: Props) {
  const active = section || "clients"

  const renderSection = () => {
    switch (active) {
      case "clients":
        return <ClientsPanel />
      case "projects":
        return <ProjectsPanel />
      case "invoices":
        return <InvoicesPanel />
      case "proposals":
        return <ProposalsPanel />
      case "reports":
        return <ReportsPanel />
      case "team":
        return <TeamPanel />
      case "settings":
        return <SettingsPanel />
      default:
        return <ClientsPanel />
    }
  }

  return (
    <div className="relative p-8 md:p-10 lg:p-12 space-y-8">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/12 via-transparent to-blue-400/10 pointer-events-none" />
      <div className="relative space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-gold uppercase tracking-[0.2em]">Business operations</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Clients, projects, invoices, analytics</h2>
            <p className="text-muted-foreground max-w-3xl">
              Pulled from the business dashboard repo and themed for the Leadership Legacy palette. The view stays mounted when you hop between tabs to preserve selections.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy transition hover:bg-gold-light">
            <Plus className="h-4 w-4" />
            Quick create
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredMetrics.map((metric, idx) => (
            <MetricCard key={metric.id} metric={metric} index={idx} />
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 shadow-2xl space-y-6">{renderSection()}</div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-gold/15 via-white/5 to-blue-500/10 p-6 shadow-2xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Stateful, tab-persistent view</p>
              <h3 className="text-xl font-semibold text-foreground">All business data stays mounted as you switch tabs.</h3>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-foreground hover:border-gold hover:text-gold border border-white/10 transition">
                Export snapshot
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy hover:bg-gold-light transition">
                View reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

