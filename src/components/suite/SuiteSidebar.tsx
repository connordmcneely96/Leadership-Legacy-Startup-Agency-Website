'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  Sheet,
  Presentation,
  HardDrive,
  Image,
  GalleryVertical as Gallery,
  Calendar,
  Mail,
  Video,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Settings,
  User,
  Menu,
  X,
} from 'lucide-react'

/**
 * Navigation item interface
 */
interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  section: 'core' | 'media' | 'productivity'
}

/**
 * Navigation sections configuration
 */
const navSections = {
  core: [
    { name: 'Dashboard', href: '/suite', icon: LayoutDashboard, section: 'core' as const },
    { name: 'Documents', href: '/suite/documents', icon: FileText, section: 'core' as const },
    { name: 'Sheets', href: '/suite/sheets', icon: Sheet, section: 'core' as const },
    { name: 'Slides', href: '/suite/slides', icon: Presentation, section: 'core' as const },
    { name: 'Drive', href: '/suite/drive', icon: HardDrive, section: 'core' as const },
  ],
  media: [
    { name: 'Photos', href: '/suite/photos', icon: Image, section: 'media' as const },
    { name: 'Gallery', href: '/suite/gallery', icon: Gallery, section: 'media' as const },
  ],
  productivity: [
    { name: 'Calendar', href: '/suite/calendar', icon: Calendar, section: 'productivity' as const },
    { name: 'Mail', href: '/suite/mail', icon: Mail, section: 'productivity' as const },
    { name: 'Meet', href: '/suite/meet', icon: Video, section: 'productivity' as const },
    { name: 'Tasks', href: '/suite/tasks', icon: CheckSquare, section: 'productivity' as const },
  ],
}

/**
 * SuiteSidebar Component
 *
 * Collapsible sidebar navigation for the productivity suite.
 * Features:
 * - Three sections: Core Apps, Media, and Productivity
 * - Collapsible to icon-only mode (desktop)
 * - Active state highlighting with gold accent
 * - Hover tooltips when collapsed
 * - User avatar and settings at bottom
 * - AI Assistant button for future MCP integration
 * - Responsive: Overlay on mobile/tablet
 */
export default function SuiteSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/suite') {
      return pathname === '/suite'
    }
    return pathname.startsWith(href)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-[calc(var(--z-fixed)+2)] p-2 bg-sidebar border border-sidebar-border rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6 text-sidebar-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-sidebar-foreground" />
        )}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-[var(--z-fixed)]"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? '80px' : '280px',
          x: isMobileOpen ? 0 : '-100%',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-[calc(var(--z-fixed)+1)] lg:translate-x-0"
      >
      {/* Header with Logo and Collapse Button */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-light rounded-lg flex items-center justify-center">
                <span className="text-navy-dark font-bold text-lg">L</span>
              </div>
              <span className="font-semibold text-sidebar-foreground">Leadership Suite</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleCollapse}
          className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-sidebar-foreground" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-sidebar-foreground" />
          )}
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {/* Core Apps Section */}
        <div className="mb-6">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="px-3 mb-2"
              >
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Core Apps
                </h3>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            {navSections.core.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={isActive(item.href)}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div className="h-px bg-sidebar-border my-4 mx-3" />

        {/* Media Section */}
        <div className="mb-6">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="px-3 mb-2"
              >
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Media
                </h3>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            {navSections.media.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={isActive(item.href)}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div className="h-px bg-sidebar-border my-4 mx-3" />

        {/* Productivity Section */}
        <div className="mb-6">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="px-3 mb-2"
              >
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Productivity
                </h3>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            {navSections.productivity.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={isActive(item.href)}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div className="h-px bg-sidebar-border my-4 mx-3" />

        {/* AI Assistant Button */}
        <div className="px-2">
          <button
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gradient-to-r from-gold/10 to-blue/10 hover:from-gold/20 hover:to-blue/20 border border-gold/20 transition-all group relative ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? 'AI Assistant' : undefined}
          >
            <Sparkles className="w-5 h-5 text-gold flex-shrink-0" />
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-sm font-medium text-sidebar-foreground"
                >
                  AI Assistant
                </motion.span>
              )}
            </AnimatePresence>

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-3 py-1.5 bg-popover text-popover-foreground text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                AI Assistant
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* User Section at Bottom */}
      <div className="border-t border-sidebar-border p-4">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="relative group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-navy-dark" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar" />

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-3 py-1.5 bg-popover text-popover-foreground text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap bottom-0">
                User Profile
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  John Doe
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  john@example.com
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!isCollapsed && (
            <button
              className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors flex-shrink-0"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4 text-sidebar-foreground" />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
    </>
  )
}

/**
 * NavLink Component
 * Individual navigation link with active state and tooltip
 */
interface NavLinkProps {
  item: NavItem
  isActive: boolean
  isCollapsed: boolean
}

function NavLink({ item, isActive, isCollapsed }: NavLinkProps) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={`
        relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
        ${isCollapsed ? 'justify-center' : ''}
        ${
          isActive
            ? 'bg-gold/10 text-gold border border-gold/20'
            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        }
      `}
      title={isCollapsed ? item.name : undefined}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-gold' : ''}`} />

      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-sm font-medium"
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Active indicator */}
      {isActive && !isCollapsed && (
        <motion.div
          layoutId="active-indicator"
          className="absolute right-2 w-1.5 h-1.5 rounded-full bg-gold"
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      )}

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-3 py-1.5 bg-popover text-popover-foreground text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
          {item.name}
        </div>
      )}
    </Link>
  )
}
