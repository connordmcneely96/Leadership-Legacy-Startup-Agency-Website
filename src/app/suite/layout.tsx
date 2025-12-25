import type { Metadata } from 'next'
import SuiteSidebar from '@/components/suite/SuiteSidebar'
import SuiteHeader from '@/components/suite/SuiteHeader'

export const metadata: Metadata = {
  title: 'Leadership Suite | Productivity Apps',
  description: 'Complete productivity suite with documents, spreadsheets, presentations, and more.',
}

/**
 * Suite Layout
 *
 * Main layout wrapper for all suite applications.
 * Provides persistent sidebar navigation and header across all suite pages.
 * Responsive layout that adapts to mobile, tablet, and desktop screens.
 */
export default function SuiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <SuiteSidebar />

      {/* Main Content Area */}
      <div className="lg:ml-[280px] transition-all duration-200">
        {/* Header */}
        <SuiteHeader />

        {/* Page Content */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  )
}
