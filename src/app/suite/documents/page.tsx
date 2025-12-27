'use client'

import { useEffect, useMemo, useState } from 'react'
import { FileText, Grid, List, Plus, Filter, SortAsc, Star } from 'lucide-react'
import { useFabActionListener } from '@/lib/hooks/useFabActionListener'

type Document = {
  id: string
  name: string
  owner: string
  modified: string
  size: string
}

/**
 * Documents Page
 *
 * File list view for documents (Google Docs equivalent).
 * Features:
 * - File list with sorting
 * - Grid/list view toggle
 * - Folder navigation
 * - New document button
 * - File cards with metadata
 */
export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [sort, setSort] = useState<'updated' | 'name' | 'size'>('updated')
  const [filter, setFilter] = useState<'all' | 'owned' | 'shared' | 'recent' | 'starred'>('all')

  const load = useMemo(
    () => async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.set('type', 'doc')
        params.set('sort', sort === 'name' ? 'name' : sort === 'size' ? 'size' : 'updated')
        if (filter !== 'all') params.set('filter', filter)
        const res = await fetch(`/api/documents?${params.toString()}`)
        const json = await res.json()
        if (json?.data) {
          setDocuments(
            json.data.map((d: any) => ({
              id: d.id,
              name: d.title,
              owner: 'You',
              modified: new Date((d.updated_at || Date.now() / 1000) * 1000).toLocaleString(),
              size: d.size ? `${(d.size / 1024 / 1024).toFixed(1)} MB` : '—',
            }))
          )
          setLoading(false)
          return
        }
      } catch {
        /* fall back */
      }
      setDocuments(mockDocuments)
      setLoading(false)
    },
    [sort, filter]
  )

  useEffect(() => {
    load()
  }, [load])

  useFabActionListener({
    'doc-blank': async () => {
      await createDoc('Untitled document')
    },
    'documents-primary': async () => {
      await createDoc('Untitled document')
    },
  })

  async function createDoc(title: string) {
    try {
      await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'demo-user', type: 'doc', title }),
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Documents</h1>
          <p className="text-muted-foreground">Create and manage your documents</p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-3">
          <button
            className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-gold/10' : 'hover:bg-muted'}`}
            title="Grid view"
            onClick={() => setView('grid')}
          >
            <Grid className="w-5 h-5 text-muted-foreground" />
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

      {/* Documents List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Table Header */}
        {view === 'list' ? (
          <>
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Owner</div>
              <div className="col-span-2">Last Modified</div>
              <div className="col-span-2">Size</div>
            </div>
            <div className="divide-y divide-border">
              {(loading ? mockDocuments : documents).map((doc) => (
                <DocumentRow key={doc.id} document={doc} />
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {(loading ? mockDocuments : documents).map((doc) => (
              <div
                key={doc.id}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue/10">
                    <FileText className="w-5 h-5 text-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.owner}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{doc.modified}</span>
                  <span>{doc.size}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gold hover:bg-gold-light text-navy-dark rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center z-[var(--z-sticky)]"
        aria-label="New document"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}

const mockDocuments: Document[] = [
  { id: '1', name: 'Q4 Marketing Strategy', owner: 'You', modified: '2 hours ago', size: '2.4 MB' },
  { id: '2', name: 'Team Meeting Notes', owner: 'You', modified: '5 hours ago', size: '1.2 MB' },
  { id: '3', name: 'Product Requirements', owner: 'Sarah Chen', modified: 'Yesterday', size: '3.1 MB' },
  { id: '4', name: 'Project Proposal', owner: 'Mike Johnson', modified: 'Yesterday', size: '1.8 MB' },
  { id: '5', name: 'User Research Findings', owner: 'You', modified: '2 days ago', size: '4.2 MB' },
  { id: '6', name: 'Brand Guidelines', owner: 'Design Team', modified: '3 days ago', size: '5.6 MB' },
  { id: '7', name: 'Technical Documentation', owner: 'You', modified: '4 days ago', size: '2.9 MB' },
  { id: '8', name: 'Client Feedback Summary', owner: 'Sales Team', modified: '5 days ago', size: '1.5 MB' },
]

function DocumentRow({ document }: { document: Document }) {
  return (
    <button className="w-full grid grid-cols-12 gap-4 px-6 py-4 hover:bg-muted/50 transition-colors text-left group">
      <div className="col-span-6 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue/10 group-hover:bg-blue/20 transition-colors">
          <FileText className="w-5 h-5 text-blue" />
        </div>
        <span className="text-sm font-medium text-foreground group-hover:text-gold transition-colors truncate">
          {document.name}
        </span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="text-sm text-muted-foreground">{document.owner}</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="text-sm text-muted-foreground">{document.modified}</span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="text-sm text-muted-foreground">{document.size}</span>
        <button
          className="ml-3 text-muted-foreground hover:text-gold transition-colors"
          onClick={async (e) => {
            e.preventDefault()
            e.stopPropagation()
            try {
              await fetch(`/api/documents/${document.id}/star`, { method: 'POST' })
            } catch (err) {
              console.error(err)
            }
          }}
        >
          <Star className="w-4 h-4" />
        </button>
        <button
          className="ml-2 text-muted-foreground hover:text-gold transition-colors text-xs"
          onClick={async (e) => {
            e.preventDefault()
            e.stopPropagation()
            const next = window.prompt('Rename document', document.name)
            if (!next || !next.trim() || next === document.name) return
            try {
              await fetch(`/api/documents/${document.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: next.trim() }),
              })
            } catch (err) {
              console.error(err)
            }
          }}
        >
          Rename
        </button>
      </div>
    </button>
  )
}
