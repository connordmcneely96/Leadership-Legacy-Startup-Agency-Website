'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
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
type DriveFile = {
  id: string
  name: string
  type: 'folder' | 'document' | 'image' | 'video' | 'other'
  size?: string
  sizeBytes?: number
  modified: string
}

const USER_ID = 'demo-user'

export default function DrivePage() {
  const [files, setFiles] = useState<DriveFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [storage, setStorage] = useState<{ used: number; quota: number } | null>(null)
  const [folderModalOpen, setFolderModalOpen] = useState(false)
  const [movePromptId, setMovePromptId] = useState<string | null>(null)

  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch(`/api/files?user_id=${USER_ID}&folder=/`)
      const json = await res.json()
      if (json?.data) {
        setFiles(
          json.data.map((f: any) => ({
            id: f.id,
            name: f.filename,
            type: mapMimeToType(f.mime_type),
            size: f.size ? formatSize(f.size) : undefined,
            sizeBytes: f.size,
            modified: f.created_at ? new Date(f.created_at * 1000).toLocaleString() : '—',
          }))
        )
      } else {
        setFiles(mockFiles)
      }
    } catch {
      setFiles(mockFiles)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchStorage = useCallback(async () => {
    try {
      const res = await fetch(`/api/storage/quota?user_id=${USER_ID}`)
      const json = await res.json()
      if (json?.data) {
        setStorage({ used: json.data.storage_used, quota: json.data.storage_quota })
      }
    } catch (e) {
      console.warn('storage fetch failed', e)
    }
  }, [])

  useEffect(() => {
    fetchFiles()
    fetchStorage()
  }, [fetchFiles, fetchStorage])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return
      setUploading(true)
      setUploadProgress(0)
      try {
        const formData = new FormData()
        formData.append('userId', USER_ID)
        formData.append('folderPath', '/')
        acceptedFiles.forEach((file) => formData.append('file', file))

        const totalSize = acceptedFiles.reduce((acc, f) => acc + f.size, 0)

        await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.open('POST', '/api/files/upload')
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percent = Math.round((event.loaded / totalSize) * 100)
              setUploadProgress(percent)
            }
          }
          xhr.onload = () => {
            setUploadProgress(100)
            resolve(true)
          }
          xhr.onerror = reject
          xhr.send(formData)
        })

        await fetchFiles()
        await fetchStorage()
      } catch (e) {
        console.error('upload failed', e)
      } finally {
        setUploading(false)
      }
    },
    [fetchFiles, fetchStorage]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  })

  const storagePercent = useMemo(() => {
    if (!storage) return 0
    return Math.min(100, Math.round((storage.used / storage.quota) * 100))
  }, [storage])

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
            <div
              className="h-full bg-gradient-to-r from-gold to-gold-light"
              style={{ width: `${storagePercent || 0}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {storage ? `${formatSize(storage.used)} / ${formatSize(storage.quota)} used` : '—'}
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-[1400px] mx-auto">
          {/* Upload Zone */}
          <div
            {...getRootProps()}
            className={`mb-8 border-2 border-dashed rounded-lg p-12 transition-all cursor-pointer group ${
              isDragActive ? 'border-gold/70 bg-gold/5' : 'border-border bg-muted/20 hover:bg-muted/30 hover:border-gold/50'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors">
                <Upload className="w-8 h-8 text-gold" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground mb-1">
                  {uploading ? `Uploading... ${uploadProgress}%` : 'Drop files here to upload'}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse your computer
                </p>
              </div>
              {uploading && (
                <div className="w-full max-w-md h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold to-gold-light transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Files Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">My Drive</h2>
              <div className="flex gap-2">
                <button
                  className="px-3 py-2 text-sm rounded-lg bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 transition-colors"
                  onClick={() => setFolderModalOpen(true)}
                >
                  New Folder
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {(loading ? mockFiles : files).map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  onDelete={async (id) => {
                    try {
                      await fetch(`/api/files/${id}`, { method: 'DELETE' })
                      await fetchFiles()
                      await fetchStorage()
                    } catch (e) {
                      console.error('delete failed', e)
                    }
                  }}
                  onRename={async (id, name) => {
                    try {
                      await fetch(`/api/files/${id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ filename: name }),
                      })
                      await fetchFiles()
                    } catch (e) {
                      console.error('rename failed', e)
                    }
                  }}
                  onMove={async (id) => {
                    const next = window.prompt('Move to folder path (e.g., /Projects)', '/')
                    if (!next) return
                    try {
                      await fetch(`/api/files/${id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ folderPath: next }),
                      })
                      await fetchFiles()
                    } catch (e) {
                      console.error('move failed', e)
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {folderModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[var(--z-modal-backdrop)] flex items-center justify-center">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold text-foreground mb-3">New Folder</h3>
            <input
              className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm mb-4"
              placeholder="Folder name"
              id="new-folder-name"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-2 text-sm rounded-lg bg-muted hover:bg-muted/80"
                onClick={() => setFolderModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 text-sm rounded-lg bg-gold text-navy-dark hover:bg-gold-light"
                onClick={async () => {
                  const el = document.getElementById('new-folder-name') as HTMLInputElement | null
                  const name = el?.value?.trim()
                  if (!name) return
                  try {
                    await fetch('/api/files/folder', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ userId: USER_ID, folderName: name, parentPath: '/' }),
                    })
                    setFolderModalOpen(false)
                    fetchFiles()
                  } catch (e) {
                    console.error('folder create failed', e)
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
  sizeBytes?: number
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

function mapMimeToType(mime: string): FileData['type'] {
  if (!mime) return 'other'
  if (mime.startsWith('image/')) return 'image'
  if (mime.startsWith('video/')) return 'video'
  if (mime.includes('presentation') || mime.includes('powerpoint')) return 'document'
  if (mime.includes('pdf') || mime.includes('msword')) return 'document'
  return 'document'
}

function formatSize(bytes: number) {
  if (!bytes) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

function FileCard({
  file,
  onDelete,
  onRename,
}: {
  file: FileData
  onDelete?: (id: string) => void
  onRename?: (id: string, name: string) => void
  onMove?: (id: string) => void
}) {
  const icons = {
    folder: Folder,
    document: HardDrive,
    image: HardDrive,
    video: HardDrive,
  }

  const Icon = icons[file.type]

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:-translate-y-1 transition-all text-left group">
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
      <div className="flex items-center justify-end gap-2">
        {onMove && (
          <button
            className="px-3 py-1 text-xs rounded-lg bg-muted hover:bg-muted/70 transition-colors"
            onClick={() => onMove(file.id)}
          >
            Move
          </button>
        )}
        {onRename && (
          <button
            className="px-3 py-1 text-xs rounded-lg bg-muted hover:bg-muted/70 transition-colors"
            onClick={() => {
              const next = window.prompt('Rename file', file.name)
              if (next && next.trim() && next !== file.name) {
                onRename(file.id, next.trim())
              }
            }}
          >
            Rename
          </button>
        )}
        {onDelete && (
          <button
            className="px-3 py-1 text-xs rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
            onClick={() => onDelete(file.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
