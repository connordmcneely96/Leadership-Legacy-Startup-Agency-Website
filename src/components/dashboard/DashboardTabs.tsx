'use client'

import dynamic from "next/dynamic"
import type { ComponentType } from "react"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Briefcase, Code2, LayoutPanelLeft, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const CurrentDashboard = dynamic(() => import("@/components/dashboard/tabs/CurrentDashboard"), {
  loading: () => <LoadingSpinner label="Loading overview" />,
})
const BusinessDashboard = dynamic(() => import("@/components/dashboard/tabs/BusinessDashboard"), {
  loading: () => <LoadingSpinner label="Loading business ops" />,
})
const DeveloperDashboard = dynamic(() => import("@/components/dashboard/tabs/DeveloperDashboard"), {
  loading: () => <LoadingSpinner label="Loading developer metrics" />,
})

type TabId = "current" | "business" | "developer"

const tabRegistry: Record<
  TabId,
  {
    label: string
    description: string
    icon: ComponentType<{ className?: string }>
  }
> = {
  current: {
    label: "Overview",
    description: "Existing dashboard content and client highlights",
    icon: LayoutPanelLeft,
  },
  business: {
    label: "Business Ops",
    description: "Clients, projects, invoices, and financial analytics",
    icon: Briefcase,
  },
  developer: {
    label: "Dev Metrics",
    description: "Infrastructure health, deployments, and performance",
    icon: Code2,
  },
}

function LoadingSpinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-muted-foreground p-6">
      <Loader2 className="h-5 w-5 animate-spin text-gold" />
      <span className="text-sm">{label ?? "Loading..."}</span>
    </div>
  )
}

export default function DashboardTabs() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>("current")
  const [mountedTabs, setMountedTabs] = useState<Set<TabId>>(new Set(["current"]))
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const queryTab = searchParams?.get("tab") as TabId | null
    const stored = typeof window !== "undefined" ? (localStorage.getItem("dashboard-tab") as TabId | null) : null
    const initial = queryTab && tabRegistry[queryTab] ? queryTab : stored && tabRegistry[stored] ? stored : "current"
    setActiveTab(initial)
    setMountedTabs(new Set([initial]))
    setIsHydrated(true)
  }, [searchParams])

  useEffect(() => {
    if (!isHydrated) return
    setMountedTabs((prev) => {
      if (prev.has(activeTab)) return prev
      const next = new Set(prev)
      next.add(activeTab)
      return next
    })

    if (typeof window === "undefined") return
    localStorage.setItem("dashboard-tab", activeTab)
    const url = new URL(window.location.href)
    url.searchParams.set("tab", activeTab)
    window.history.replaceState({}, "", url.toString())
  }, [activeTab, isHydrated])

  const tabs = useMemo(
    () => [
      { id: "current" as TabId, Component: CurrentDashboard },
      { id: "business" as TabId, Component: BusinessDashboard },
      { id: "developer" as TabId, Component: DeveloperDashboard },
    ],
    []
  )

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 space-y-10">
      <header className="space-y-4">
        <p className="text-sm font-semibold text-gold uppercase tracking-[0.2em]">Unified dashboards</p>
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Dashboard control center</h1>
          <p className="text-muted-foreground max-w-3xl">
            Switch between the existing overview, business operations cockpit, and developer reliability insights without
            losing your place. Tabs persist across refreshes and load independently to keep interactions fast.
          </p>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        {(Object.keys(tabRegistry) as TabId[]).map((tabId) => {
          const tab = tabRegistry[tabId]
          const Icon = tab.icon
          const isActive = activeTab === tabId
          return (
            <button
              key={tabId}
              onClick={() => setActiveTab(tabId)}
              className={cn(
                "relative flex items-center gap-3 rounded-full px-4 py-2 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold",
                "bg-white/5 hover:bg-white/10 border border-white/10 shadow-sm",
                isActive && "bg-gold text-navy border-gold hover:bg-gold-light"
              )}
              aria-pressed={isActive}
              aria-label={tab.label}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold">{tab.label}</span>
                <span className="text-xs text-muted-foreground hidden sm:block">{tab.description}</span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-navy/80 to-navy-dark/90 shadow-2xl backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-blue-500/10 pointer-events-none" />
        <div className="relative">
          {tabs.map(({ id, Component }) => {
            const isVisible = activeTab === id
            const shouldRender = mountedTabs.has(id)
            return (
              <div
                key={id}
                aria-hidden={!isVisible}
                style={{ display: isVisible ? "block" : "none" }}
                className="w-full transition-opacity duration-300"
              >
                {shouldRender ? <Component /> : <LoadingSpinner />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

