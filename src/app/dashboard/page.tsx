import DashboardTabs from "@/components/dashboard/DashboardTabs"

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-navy-dark to-navy pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,39,0.15),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(52,152,219,0.15),transparent_25%)] pointer-events-none" />
      <div className="relative pt-24">
        <DashboardTabs />
      </div>
    </main>
  )
}

