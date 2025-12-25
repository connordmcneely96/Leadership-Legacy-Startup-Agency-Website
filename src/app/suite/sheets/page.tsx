import { Sheet, Grid, List, Plus, Filter, SortAsc } from 'lucide-react'

/**
 * Sheets Page
 *
 * Spreadsheet management page (Google Sheets equivalent).
 * Features:
 * - Recent spreadsheets grid
 * - List/grid view toggle
 * - Sorting and filtering
 */
export default function SheetsPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Sheets</h1>
          <p className="text-muted-foreground">Create and manage your spreadsheets</p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors bg-gold/10" title="Grid view">
            <Grid className="w-5 h-5 text-gold" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="List view">
            <List className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors text-sm">
            <SortAsc className="w-4 h-4" />
            Sort
          </button>
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors text-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Sheets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockSheets.map((sheet) => (
          <SheetCard key={sheet.id} sheet={sheet} />
        ))}
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gold hover:bg-gold-light text-navy-dark rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center z-[var(--z-sticky)]"
        aria-label="New spreadsheet"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}

/**
 * Sheet Card Component
 */
interface SheetData {
  id: string
  name: string
  owner: string
  modified: string
  preview: string
}

const mockSheets: SheetData[] = [
  { id: '1', name: 'Sales Pipeline 2024', owner: 'You', modified: '2 hours ago', preview: 'Q1 Revenue: $125K' },
  { id: '2', name: 'Budget Analysis', owner: 'Finance Team', modified: '5 hours ago', preview: 'Total: $450K' },
  { id: '3', name: 'Project Timeline', owner: 'Sarah Chen', modified: 'Yesterday', preview: '12 tasks remaining' },
  { id: '4', name: 'Inventory Tracker', owner: 'You', modified: 'Yesterday', preview: '234 items in stock' },
  { id: '5', name: 'Customer Data', owner: 'Sales Team', modified: '2 days ago', preview: '1,245 contacts' },
  { id: '6', name: 'Marketing Metrics', owner: 'You', modified: '3 days ago', preview: 'CTR: 3.2%' },
]

function SheetCard({ sheet }: { sheet: SheetData }) {
  return (
    <button className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all text-left group">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-3 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
          <Sheet className="w-6 h-6 text-green-500" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-gold transition-colors truncate">
        {sheet.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-3">{sheet.preview}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{sheet.owner}</span>
        <span>{sheet.modified}</span>
      </div>
    </button>
  )
}
