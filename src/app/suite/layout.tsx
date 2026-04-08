import type { Metadata } from 'next'
import SuiteAuthLayout from '@/components/suite/SuiteAuthLayout'

export const metadata: Metadata = {
  title: 'Leadership Suite | Productivity Apps',
  description: 'Complete productivity suite with documents, spreadsheets, presentations, and more.',
}

export default function SuiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SuiteAuthLayout>{children}</SuiteAuthLayout>
}
