import { HardDrive, Folder, Upload, Star, Clock, Users, Trash2 } from 'lucide-react'

/**
 * Drive Page
 *
 * Full file explorer interface for cloud storage.
 * Features:
 * - Folder tree navigation
 * - File upload zone
 * - Storage quota display
 * - Shared/starred/recent tabs
 */
export default function DrivePage() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Secondary Sidebar - Folder Tree */}
      <aside className="w-64 border-r border-border bg-card p-4 overflow-y-auto">
        <div className="space-y-1 mb-6">
          <SidebarButton icon={HardDrive} label="My Drive" active />
          <SidebarButton icon={Star} label="Starred" />
          <SidebarButton icon={Clock} label="Recent" />
          <SidebarButton icon={Users} label="Shared with me" />
          <SidebarButton icon={Trash2} label="Trash" />
        </div>

        <div className="border-t border-border pt-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Folders
          </h3>
          <div className="space-y-1">
            <FolderItem name="Projects" count={12} />
            <FolderItem name="Documents" count={24} />
            <FolderItem name="Marketing" count={8} />
            <FolderItem name="Design Assets" count={156} />
          </div>
        </div>

        {/* Storage Quota */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <HardDrive className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Storage</span>
          </div>
          <div className="h-2 bg-background rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-gold to-gold-light w-[56%]" />
          </div>
          <p className="text-xs text-muted-foreground">8.4 GB of 15 GB used</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-[1400px] mx-auto">
          {/* Upload Zone */}
          <div className="mb-8 border-2 border-dashed border-border rounded-lg p-12 bg-muted/20 hover:bg-muted/30 hover:border-gold/50 transition-all cursor-pointer group">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors">
                <Upload className="w-8 h-8 text-gold" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground mb-1">
                  Drop files here to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse your computer
                </p>
              </div>
            </div>
          </div>

          {/* Files Grid */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">My Drive</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockFiles.map((file) => (
                <FileCard key={file.id} file={file} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Sidebar Button Component
 */
interface SidebarButtonProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  active?: boolean
}

function SidebarButton({ icon: Icon, label, active }: SidebarButtonProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
        active
          ? 'bg-gold/10 text-gold border border-gold/20'
          : 'text-foreground hover:bg-muted'
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}

/**
 * Folder Item Component
 */
function FolderItem({ name, count }: { name: string; count: number }) {
  return (
    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left group">
      <Folder className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors flex-shrink-0" />
      <span className="text-sm text-foreground flex-1 truncate">{name}</span>
      <span className="text-xs text-muted-foreground">{count}</span>
    </button>
  )
}

/**
 * File Card Component
 */
interface FileData {
  id: string
  name: string
  type: 'folder' | 'document' | 'image' | 'video'
  size?: string
  modified: string
}

const mockFiles: FileData[] = [
  { id: '1', name: 'Q4 Reports', type: 'folder', modified: '2 hours ago' },
  { id: '2', name: 'Marketing Strategy.doc', type: 'document', size: '2.4 MB', modified: '5 hours ago' },
  { id: '3', name: 'Team Photos', type: 'folder', modified: 'Yesterday' },
  { id: '4', name: 'Product Demo.mp4', type: 'video', size: '45.2 MB', modified: 'Yesterday' },
  { id: '5', name: 'Logo Design.png', type: 'image', size: '1.2 MB', modified: '2 days ago' },
  { id: '6', name: 'Client Assets', type: 'folder', modified: '3 days ago' },
]

function FileCard({ file }: { file: FileData }) {
  const icons = {
    folder: Folder,
    document: HardDrive,
    image: HardDrive,
    video: HardDrive,
  }

  const Icon = icons[file.type]

  return (
    <button className="bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:-translate-y-1 transition-all text-left group">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg bg-muted group-hover:bg-gold/10 transition-colors">
          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground truncate group-hover:text-gold transition-colors">
            {file.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {file.size && <span className="text-xs text-muted-foreground">{file.size}</span>}
            {file.size && <span className="text-xs text-muted-foreground">•</span>}
            <span className="text-xs text-muted-foreground">{file.modified}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
