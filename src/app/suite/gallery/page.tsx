import 'use client'

import { useEffect, useMemo, useState } from 'react'
import { GalleryVertical as Gallery, Filter, Palette, FileImage, Plus } from 'lucide-react'
import { useFabActionListener } from '@/lib/hooks/useFabActionListener'

/**
 * Gallery Page
 *
 * Brand asset management and visual content organization.
 * Features:
 * - Category filters (logos, graphics, templates)
 * - Color palette extraction display
 * - Grid layout for brand assets
 */
type Asset = {
  id: string
  name: string
  color: string
  palette?: string[]
}

type Album = {
  id: string
  name: string
  count?: number
}

const USER_ID = 'demo-user'
const mockAlbums: Album[] = [
  { id: 'a1', name: 'Brand Logos' },
  { id: 'a2', name: 'Campaign A' },
]

export default function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>(mockAlbums)
  const [loading, setLoading] = useState(true)
  const [albumModal, setAlbumModal] = useState(false)
  const [albumName, setAlbumName] = useState('')

  const load = useMemo(
    () => async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/albums?user_id=${USER_ID}`)
        const json = await res.json()
        if (json?.data) {
          setAlbums(json.data)
          setLoading(false)
          return
        }
      } catch {
        /* fallback */
      }
      setAlbums(mockAlbums)
      setLoading(false)
    },
    []
  )

  useEffect(() => {
    load()
  }, [load])

  useFabActionListener({
    'gallery-create': () => setAlbumModal(true),
    'gallery-add': () => setAlbumModal(true),
    'gallery-primary': () => setAlbumModal(true),
  })
  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gallery</h1>
          <p className="text-muted-foreground">Manage your brand assets and visual content</p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-light text-navy-dark font-medium rounded-lg transition-all hover:scale-105">
          <Plus className="w-5 h-5" />
          <span className="text-sm">Upload Asset</span>
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-3 mb-8">
        <CategoryFilter label="All Assets" active />
        <CategoryFilter label="Logos" />
        <CategoryFilter label="Graphics" />
        <CategoryFilter label="Templates" />
        <CategoryFilter label="Icons" />
        <CategoryFilter label="Backgrounds" />
      </div>

      {/* Albums */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Albums</h3>
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20"
            onClick={() => setAlbumModal(true)}
          >
            <Plus className="w-4 h-4" />
            New Album
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(loading ? mockAlbums : albums).map((album) => (
            <div key={album.id} className="px-3 py-2 rounded-lg border border-border bg-muted/30 text-sm text-foreground">
              {album.name}
            </div>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      <div>
        {/* Logos Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FileImage className="w-5 h-5 text-gold" />
            <h2 className="text-xl font-semibold text-foreground">Logos</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mockAssets.logos.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>

        {/* Graphics Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Gallery className="w-5 h-5 text-gold" />
            <h2 className="text-xl font-semibold text-foreground">Graphics</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mockAssets.graphics.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>

        {/* Templates Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-gold" />
            <h2 className="text-xl font-semibold text-foreground">Templates</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mockAssets.templates.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
      </div>
      {albumModal && (
        <div className="fixed inset-0 z-[var(--z-modal)] bg-black/50 flex items-center justify-center px-4">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">New Album</h3>
              <button className="text-muted-foreground hover:text-foreground" onClick={() => setAlbumModal(false)}>
                ×
              </button>
            </div>
            <input
              className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm"
              placeholder="Album name"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button className="px-3 py-2 text-sm rounded-lg bg-muted hover:bg-muted/80" onClick={() => setAlbumModal(false)}>
                Cancel
              </button>
              <button
                className="px-3 py-2 text-sm rounded-lg bg-gold text-navy-dark hover:bg-gold-light"
                onClick={async () => {
                  if (!albumName.trim()) return
                  try {
                    await fetch('/api/albums', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ userId: USER_ID, name: albumName.trim() }),
                    })
                    setAlbumName('')
                    setAlbumModal(false)
                    load()
                  } catch (e) {
                    console.error(e)
                  }
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Category Filter Component
 */
function CategoryFilter({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-gold text-navy-dark'
          : 'bg-muted text-foreground hover:bg-muted-foreground/10'
      }`}
    >
      {label}
    </button>
  )
}

/**
 * Asset Card Component
 */
interface Asset {
  id: string
  name: string
  color: string
  palette?: string[]
}

const mockAssets = {
  logos: [
    { id: 'l1', name: 'Primary Logo', color: 'from-gold to-gold-light', palette: ['#C9A227', '#D4B44A', '#1A1A2E'] },
    { id: 'l2', name: 'Logo Mark', color: 'from-blue to-blue-light', palette: ['#3498DB', '#5FAEE3', '#1A1A2E'] },
    { id: 'l3', name: 'Logo White', color: 'from-gray-700 to-gray-900', palette: ['#FFFFFF', '#F5F5F7'] },
    { id: 'l4', name: 'Logo Alt', color: 'from-navy-dark to-navy', palette: ['#1A1A2E', '#252542'] },
  ],
  graphics: [
    { id: 'g1', name: 'Hero Banner', color: 'from-purple-500 to-purple-400' },
    { id: 'g2', name: 'Pattern 01', color: 'from-green-500 to-green-400' },
    { id: 'g3', name: 'Pattern 02', color: 'from-orange-500 to-orange-400' },
    { id: 'g4', name: 'Texture', color: 'from-pink-500 to-pink-400' },
  ],
  templates: [
    { id: 't1', name: 'Social Media Post', color: 'from-gold to-gold-light' },
    { id: 't2', name: 'Email Header', color: 'from-blue to-blue-light' },
    { id: 't3', name: 'Presentation Cover', color: 'from-green-500 to-green-400' },
    { id: 't4', name: 'Business Card', color: 'from-purple-500 to-purple-400' },
  ],
}

function AssetCard({ asset }: { asset: Asset }) {
  return (
    <div className="group">
      <button className="w-full aspect-square rounded-lg overflow-hidden hover:scale-105 hover:shadow-xl transition-all mb-3 relative">
        <div className={`w-full h-full bg-gradient-to-br ${asset.color} flex items-center justify-center`}>
          <FileImage className="w-16 h-16 text-white/30" />
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </button>
      <div>
        <p className="text-sm font-medium text-foreground truncate mb-2">{asset.name}</p>
        {asset.palette && (
          <div className="flex items-center gap-1">
            {asset.palette.map((color, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded border border-border"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
