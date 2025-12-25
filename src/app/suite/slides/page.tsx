import { Presentation, Grid, List, Plus, Filter, SortAsc, Layout } from 'lucide-react'

/**
 * Slides Page
 *
 * Presentation management page (Google Slides equivalent).
 * Features:
 * - Presentation thumbnails in grid
 * - Template gallery section
 * - Recent presentations
 */
export default function SlidesPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Slides</h1>
          <p className="text-muted-foreground">Create and manage your presentations</p>
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

      {/* Template Gallery */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Layout className="w-5 h-5 text-gold" />
          <h2 className="text-xl font-semibold text-foreground">Start with a template</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>

      {/* Recent Presentations */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent presentations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockPresentations.map((presentation) => (
            <PresentationCard key={presentation.id} presentation={presentation} />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gold hover:bg-gold-light text-navy-dark rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center z-[var(--z-sticky)]"
        aria-label="New presentation"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}

/**
 * Template & Presentation Interfaces
 */
interface Template {
  id: string
  name: string
  color: string
}

interface PresentationData {
  id: string
  name: string
  owner: string
  modified: string
  slides: number
}

const mockTemplates: Template[] = [
  { id: '1', name: 'Pitch Deck', color: 'from-blue to-blue-light' },
  { id: '2', name: 'Product Launch', color: 'from-gold to-gold-light' },
  { id: '3', name: 'Team Update', color: 'from-green-500 to-green-400' },
  { id: '4', name: 'Sales Report', color: 'from-purple-500 to-purple-400' },
]

const mockPresentations: PresentationData[] = [
  { id: '1', name: 'Q4 Product Roadmap', owner: 'You', modified: '2 hours ago', slides: 24 },
  { id: '2', name: 'Investor Pitch Deck', owner: 'You', modified: '5 hours ago', slides: 18 },
  { id: '3', name: 'Team All-Hands', owner: 'Mike Johnson', modified: 'Yesterday', slides: 32 },
  { id: '4', name: 'Customer Success Stories', owner: 'Sarah Chen', modified: 'Yesterday', slides: 15 },
  { id: '5', name: 'Product Demo', owner: 'You', modified: '2 days ago', slides: 12 },
  { id: '6', name: 'Marketing Strategy', owner: 'Marketing Team', modified: '3 days ago', slides: 28 },
]

function TemplateCard({ template }: { template: Template }) {
  return (
    <button className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group">
      <div className={`h-32 bg-gradient-to-br ${template.color} flex items-center justify-center`}>
        <Presentation className="w-12 h-12 text-white/80" />
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-foreground group-hover:text-gold transition-colors">
          {template.name}
        </p>
      </div>
    </button>
  )
}

function PresentationCard({ presentation }: { presentation: PresentationData }) {
  return (
    <button className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group">
      <div className="h-40 bg-gradient-to-br from-navy-light to-navy-dark flex items-center justify-center border-b border-border">
        <Presentation className="w-16 h-16 text-gold/30" />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-gold transition-colors truncate">
          {presentation.name}
        </h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{presentation.owner}</span>
          <span>{presentation.slides} slides</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{presentation.modified}</p>
      </div>
    </button>
  )
}
