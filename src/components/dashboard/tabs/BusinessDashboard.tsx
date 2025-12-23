'use client'

import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  FileText,
  HandCoins,
  Plus,
  Users,
} from "lucide-react"
import { cn, formatCurrency, formatDate, formatPercent } from "@/lib/utils"

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

const activeProjects = [
  { id: "1", name: "AI Chatbot Development", client: "Tech Corp", status: "IN_PROGRESS", progress: 65, deadline: "2025-01-15" },
  { id: "2", name: "RAG System Implementation", client: "Finance Inc", status: "IN_PROGRESS", progress: 40, deadline: "2025-01-20" },
  { id: "3", name: "Landing Page Design", client: "Startup XYZ", status: "REVIEW", progress: 90, deadline: "2025-01-10" },
  { id: "4", name: "Graphics Package", client: "Brand Co", status: "IN_PROGRESS", progress: 50, deadline: "2025-01-18" },
]

const recentInvoices = [
  { id: "1", invoiceNumber: "INV-2412-0001", client: "Tech Corp", amount: 5000, status: "PAID", dueDate: "2024-12-15" },
  { id: "2", invoiceNumber: "INV-2412-0002", client: "Finance Inc", amount: 3500, status: "SENT", dueDate: "2024-12-20" },
  { id: "3", invoiceNumber: "INV-2412-0003", client: "Startup XYZ", amount: 2000, status: "VIEWED", dueDate: "2024-12-25" },
]

const clientRoster = [
  { id: "c1", name: "Tech Corp", projects: 4, totalSpent: 128000, satisfaction: 92 },
  { id: "c2", name: "Finance Inc", projects: 3, totalSpent: 98000, satisfaction: 88 },
  { id: "c3", name: "Startup XYZ", projects: 2, totalSpent: 42000, satisfaction: 90 },
]

const teamLoad = [
  { id: "u1", name: "Olivia", role: "Delivery Lead", workload: 82, focus: "AI Agents" },
  { id: "u2", name: "Mason", role: "Full-stack", workload: 68, focus: "RAG Systems" },
  { id: "u3", name: "Harper", role: "Design", workload: 54, focus: "Landing pages" },
]

const revenueTrend = [
  { month: "Aug", value: 32000 },
  { month: "Sep", value: 35500 },
  { month: "Oct", value: 38900 },
  { month: "Nov", value: 41000 },
  { month: "Dec", value: 45320 },
]

function getStatusColor(status: string) {
  const palette: Record<string, string> = {
    DRAFT: "bg-gray-500/10 text-gray-300 border-gray-500/30",
    IN_PROGRESS: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    REVIEW: "bg-orange-500/10 text-orange-200 border-orange-500/30",
    COMPLETED: "bg-green-500/10 text-green-300 border-green-500/30",
    SENT: "bg-cyan-500/10 text-cyan-200 border-cyan-500/30",
    VIEWED: "bg-cyan-500/10 text-cyan-200 border-cyan-500/30",
    PAID: "bg-green-500/10 text-green-200 border-green-500/30",
  }
  return palette[status] ?? "bg-white/5 text-white border-white/10"
}

function StatusBadge({ status }: { status: string }) {
  return <span className={cn("px-3 py-1 text-xs font-semibold rounded-full border", getStatusColor(status))}>{status}</span>
}

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

export default function BusinessDashboard() {
  return (
    <div className="relative p-8 md:p-10 lg:p-12 space-y-8">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/12 via-transparent to-blue-400/10 pointer-events-none" />
      <div className="relative space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-gold uppercase tracking-[0.2em]">Business operations</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Clients, projects, invoices, analytics</h2>
            <p className="text-muted-foreground max-w-3xl">
              Pulled from the business dashboard repo and themed for the Leadership Legacy palette. The view stays mounted
              when you hop between tabs to preserve selections.
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

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-gold" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Project workflow tracker</h3>
                <p className="text-sm text-muted-foreground">Active projects with deadlines, statuses, and progress.</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-foreground hover:border-gold transition">
              View all projects
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {activeProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-xl border border-white/10 bg-navy/60 p-4 shadow-lg hover:border-gold/50 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                    <h4 className="text-lg font-semibold text-foreground">{project.name}</h4>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-cyan-200">{project.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-500 transform-gpu"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Due {formatDate(project.deadline)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gold" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Invoice pipeline</h3>
                <p className="text-sm text-muted-foreground">Issuance, views, and payment momentum.</p>
              </div>
            </div>
            <div className="space-y-3">
              {recentInvoices.map((invoice, idx) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + idx * 0.05 }}
                  className="rounded-xl border border-white/10 bg-navy/60 p-4 flex items-center justify-between gap-3 hover:border-gold/40 transition"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-muted-foreground">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-foreground">{invoice.client}</p>
                    <p className="text-xs text-muted-foreground">Due {formatDate(invoice.dueDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gold">{formatCurrency(invoice.amount)}</p>
                    <StatusBadge status={invoice.status} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-gold/10 via-white/5 to-blue-400/10 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-gold" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Client management</h3>
                <p className="text-sm text-muted-foreground">Lifetime value and satisfaction.</p>
              </div>
            </div>
            <div className="space-y-3">
              {clientRoster.map((client, idx) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.projects} active projects</p>
                    </div>
                    <span className="text-sm font-semibold text-gold">{formatCurrency(client.totalSpent)}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Satisfaction</span>
                    <span className="font-semibold text-green-300">{client.satisfaction}/100</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transform-gpu"
                      style={{ width: `${client.satisfaction}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <HandCoins className="h-5 w-5 text-gold" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Financial analytics</h3>
                <p className="text-sm text-muted-foreground">Month-over-month revenue momentum.</p>
              </div>
            </div>
            <div className="flex items-end gap-4 h-48">
              {revenueTrend.map((point, idx) => {
                const height = (point.value / Math.max(...revenueTrend.map((p) => p.value))) * 100
                return (
                  <motion.div
                    key={point.month}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.05 * idx, duration: 0.35 }}
                    className="flex-1"
                    style={{ transformOrigin: "bottom" }}
                  >
                    <div className="h-full flex flex-col justify-end gap-2">
                      <div className="relative w-full rounded-xl bg-white/10 overflow-hidden h-full">
                        <div
                          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gold to-gold-light"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <div className="text-xs text-center text-muted-foreground">{point.month}</div>
                      <div className="text-xs text-center text-foreground font-semibold">{formatCurrency(point.value)}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-gold" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Team workload</h3>
                <p className="text-sm text-muted-foreground">Real-time utilization snapshot.</p>
              </div>
            </div>
            <div className="space-y-3">
              {teamLoad.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="rounded-xl border border-white/10 bg-navy/60 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                    <span className="text-xs font-semibold text-cyan-200">{formatPercent(member.workload, 0)}</span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 transform-gpu"
                      style={{ width: `${member.workload}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Current focus: {member.focus}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

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
                <CheckCircle2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

