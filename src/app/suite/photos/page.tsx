import { Image, Upload, Grid, Calendar, Album, Plus } from 'lucide-react'

/**
 * Photos Page
 *
 * Photo library and gallery management.
 * Features:
 * - Masonry grid layout
 * - Date-based grouping
 * - Album sidebar
 * - Upload button
 * - Selection mode for bulk actions
 */
export default function PhotosPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Secondary Sidebar - Albums */}
      <aside className="w-64 border-r border-border bg-card p-4 overflow-y-auto">
        <div className="mb-6">
          <button className="w-full flex items-center gap-2 px-4 py-3 bg-gold hover:bg-gold-light text-navy-dark rounded-lg transition-all hover:scale-105">
            <Upload className="w-5 h-5" />
            <span className="text-sm font-medium">Upload Photos</span>
          </button>
        </div>

        <div className="space-y-1 mb-6">
          <AlbumButton icon={Image} label="All Photos" count={1245} active />
          <AlbumButton icon={Calendar} label="Recent" count={48} />
          <AlbumButton icon={Album} label="Albums" count={12} />
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              My Albums
            </h3>
            <button className="p-1 hover:bg-muted rounded transition-colors">
              <Plus className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="space-y-1">
            <AlbumItem name="Team Events 2024" count={156} />
            <AlbumItem name="Product Photography" count={89} />
            <AlbumItem name="Office Spaces" count={42} />
            <AlbumItem name="Conference 2024" count={234} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-[1600px] mx-auto">
          {/* Date Group */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Today</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {mockPhotos.slice(0, 5).map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Yesterday</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {mockPhotos.slice(5, 10).map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">This Week</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {mockPhotos.slice(10).map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Album Button Component
 */
interface AlbumButtonProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  count: number
  active?: boolean
}

function AlbumButton({ icon: Icon, label, count, active }: AlbumButtonProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
        active
          ? 'bg-gold/10 text-gold border border-gold/20'
          : 'text-foreground hover:bg-muted'
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium flex-1 truncate">{label}</span>
      <span className="text-xs text-muted-foreground">{count}</span>
    </button>
  )
}

/**
 * Album Item Component
 */
function AlbumItem({ name, count }: { name: string; count: number }) {
  return (
    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left group">
      <Album className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors flex-shrink-0" />
      <span className="text-sm text-foreground flex-1 truncate">{name}</span>
      <span className="text-xs text-muted-foreground">{count}</span>
    </button>
  )
}

/**
 * Photo Card Component
 */
interface PhotoData {
  id: string
  color: string
}

const mockPhotos: PhotoData[] = Array.from({ length: 15 }, (_, i) => ({
  id: `photo-${i + 1}`,
  color: ['from-blue to-blue-light', 'from-gold to-gold-light', 'from-green-500 to-green-400', 'from-purple-500 to-purple-400'][i % 4],
}))

function PhotoCard({ photo }: { photo: PhotoData }) {
  return (
    <button className="aspect-square rounded-lg overflow-hidden hover:scale-105 hover:shadow-xl transition-all group relative">
      <div className={`w-full h-full bg-gradient-to-br ${photo.color} flex items-center justify-center`}>
        <Image className="w-12 h-12 text-white/30" />
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
    </button>
  )
}
