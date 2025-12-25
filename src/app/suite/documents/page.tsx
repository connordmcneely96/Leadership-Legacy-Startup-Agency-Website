import { FileText, Grid, List, Plus, Filter, SortAsc } from 'lucide-react'

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
          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Grid view">
            <Grid className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors bg-gold/10" title="List view">
            <List className="w-5 h-5 text-gold" />
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

      {/* Documents List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
          <div className="col-span-6">Name</div>
          <div className="col-span-2">Owner</div>
          <div className="col-span-2">Last Modified</div>
          <div className="col-span-2">Size</div>
        </div>

        {/* Documents */}
        <div className="divide-y divide-border">
          {mockDocuments.map((doc) => (
            <DocumentRow key={doc.id} document={doc} />
          ))}
        </div>
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

/**
 * Document Row Component
 */
interface Document {
  id: string
  name: string
  owner: string
  modified: string
  size: string
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
      </div>
    </button>
  )
}
