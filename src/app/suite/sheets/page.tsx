'use client'

import { useEffect, useMemo, useState } from 'react'
import { Sheet, Grid, List, Plus, Filter, SortAsc } from 'lucide-react'
import { useFabActionListener } from '@/lib/hooks/useFabActionListener'

type SheetDoc = {
  id: string
  name: string
  owner: string
  modified: string
  preview: string
}

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
  const [items, setItems] = useState<SheetDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [sort, setSort] = useState<'updated' | 'name' | 'size'>('updated')
  const [filter, setFilter] = useState<'all' | 'recent' | 'starred' | 'shared' | 'owned'>('all')

  const load = useMemo(
    () => async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.set('type', 'sheet')
        params.set('sort', sort === 'name' ? 'name' : sort === 'size' ? 'size' : 'updated')
        if (filter !== 'all') params.set('filter', filter)
        const res = await fetch(`/api/documents?${params.toString()}`)
        const json = await res.json()
        if (json?.data) {
          setItems(
            json.data.map((d: any) => ({
              id: d.id,
              name: d.title,
              owner: 'You',
              modified: new Date((d.updated_at || Date.now() / 1000) * 1000).toLocaleString(),
              preview: d.size ? `${(d.size / 1024).toFixed(0)} KB` : 'Tap to open',
            }))
          )
          setLoading(false)
          return
        }
      } catch {
        /* fall back */
      }
      setItems(mockSheets)
      setLoading(false)
    },
    [sort, filter]
  )

  useEffect(() => {
    load()
  }, [load])

  useFabActionListener({
    'sheet-blank': async () => {
      await createSheet('Untitled sheet')
    },
    'sheet-import': async () => {
      await createSheet('Imported sheet')
    },
    'sheets-primary': async () => {
      await createSheet('Untitled sheet')
    },
  })

  async function createSheet(title: string) {
    try {
      await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'demo-user', type: 'sheet', title }),
      })
      load()
    } catch {
      /* ignore */
    }
  }
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
          <button
            className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-gold/10' : 'hover:bg-muted'}`}
            title="Grid view"
            onClick={() => setView('grid')}
          >
            <Grid className={`w-5 h-5 ${view === 'grid' ? 'text-gold' : 'text-muted-foreground'}`} />
          </button>
          <button
            className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-gold/10' : 'hover:bg-muted'}`}
            title="List view"
            onClick={() => setView('list')}
          >
            <List className={`w-5 h-5 ${view === 'list' ? 'text-gold' : 'text-muted-foreground'}`} />
          </button>
          <button
            className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors text-sm"
            onClick={() => setSort(sort === 'updated' ? 'name' : sort === 'name' ? 'size' : 'updated')}
          >
            <SortAsc className="w-4 h-4" />
            Sort: {sort}
          </button>
          <button
            className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors text-sm"
            onClick={() => {
              const next: typeof filter =
                filter === 'all'
                  ? 'recent'
                  : filter === 'recent'
                  ? 'starred'
                  : filter === 'starred'
                  ? 'shared'
                  : filter === 'shared'
                  ? 'owned'
                  : 'all'
              setFilter(next)
            }}
          >
            <Filter className="w-4 h-4" />
            Filter: {filter}
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(loading ? mockSheets : items).map((sheet) => (
            <SheetCard key={sheet.id} sheet={sheet} />
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
            <div className="col-span-6">Name</div>
            <div className="col-span-2">Owner</div>
            <div className="col-span-2">Last Modified</div>
            <div className="col-span-2">Preview</div>
          </div>
          <div className="divide-y divide-border">
            {(loading ? mockSheets : items).map((sheet) => (
              <div key={sheet.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-muted/50 transition-colors text-left group">
                <div className="col-span-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                    <Sheet className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-gold transition-colors truncate">
                    {sheet.name}
                  </span>
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">{sheet.owner}</div>
                <div className="col-span-2 text-sm text-muted-foreground">{sheet.modified}</div>
                <div className="col-span-2 text-sm text-muted-foreground">{sheet.preview}</div>
              </div>
            ))}
          </div>
        </div>
      )}

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
