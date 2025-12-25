'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Bell,
  ChevronRight,
  Plus,
  FileText,
  Sheet,
  Presentation,
  Calendar,
  CheckSquare,
  Mail,
  User,
  Settings,
  LogOut,
} from 'lucide-react'

/**
 * Breadcrumb item interface
 */
interface Breadcrumb {
  label: string
  href?: string
}

/**
 * Get breadcrumbs from pathname
 */
function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0 || (segments.length === 1 && segments[0] === 'suite')) {
    return [{ label: 'Dashboard' }]
  }

  const breadcrumbs: Breadcrumb[] = [{ label: 'Suite', href: '/suite' }]

  segments.forEach((segment, index) => {
    if (segment === 'suite') return

    const label = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    const href = index === segments.length - 1 ? undefined : `/${segments.slice(0, index + 1).join('/')}`

    breadcrumbs.push({ label, href })
  })

  return breadcrumbs
}

/**
 * Quick create menu items based on current page
 */
const quickCreateItems = [
  { label: 'Document', icon: FileText, action: 'document' },
  { label: 'Spreadsheet', icon: Sheet, action: 'sheet' },
  { label: 'Presentation', icon: Presentation, action: 'presentation' },
  { label: 'Event', icon: Calendar, action: 'event' },
  { label: 'Task', icon: CheckSquare, action: 'task' },
  { label: 'Email', icon: Mail, action: 'email' },
]

/**
 * SuiteHeader Component
 *
 * Top header bar for the productivity suite.
 * Features:
 * - Breadcrumb navigation
 * - Global search bar with gold accent on focus
 * - Notifications bell icon
 * - User profile dropdown
 * - Context-aware "New" button
 */
export default function SuiteHeader() {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showQuickCreate, setShowQuickCreate] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleQuickCreate = (action: string) => {
    // TODO: Implement quick create actions
    console.log('Quick create:', action)
    setShowQuickCreate(false)
  }

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-[var(--z-sticky)]">
      {/* Left Section: Breadcrumbs */}
      <div className="flex items-center gap-2 flex-1 lg:flex-initial ml-14 lg:ml-0">
        <nav className="flex items-center gap-2" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground hidden md:block" />}
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:inline"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-sm font-medium text-foreground truncate">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Center Section: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-2xl mx-8">
        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
              searchFocused ? 'text-gold' : 'text-muted-foreground'
            }`}
          />
          <input
            type="text"
            placeholder="Search across all apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`w-full pl-10 pr-4 py-2 bg-muted/50 border rounded-lg text-sm transition-all focus:outline-none ${
              searchFocused
                ? 'border-gold bg-muted shadow-[0_0_0_3px_rgba(201,162,39,0.1)]'
                : 'border-border hover:border-muted-foreground/50'
            }`}
            aria-label="Global search"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <Plus className="w-4 h-4 rotate-45" />
            </button>
          )}
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-2 lg:gap-3 flex-1 justify-end">
        {/* New Button */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowQuickCreate(!showQuickCreate)}
            className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-light text-navy-dark font-medium rounded-lg transition-all hover:scale-105 active:scale-95"
            aria-label="Create new item"
            aria-expanded={showQuickCreate}
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm">New</span>
          </button>

          {/* Quick Create Dropdown */}
          <AnimatePresence>
            {showQuickCreate && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-[var(--z-dropdown)]"
                  onClick={() => setShowQuickCreate(false)}
                />

                {/* Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-xl overflow-hidden z-[calc(var(--z-dropdown)+1)]"
                >
                  <div className="py-2">
                    {quickCreateItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.action}
                          onClick={() => handleQuickCreate(item.action)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <Bell className="w-5 h-5 text-foreground" />
            {/* Notification badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-[var(--z-dropdown)]"
                  onClick={() => setShowNotifications(false)}
                />

                {/* Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-xl overflow-hidden z-[calc(var(--z-dropdown)+1)]"
                >
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-8 text-center text-muted-foreground text-sm">
                      No new notifications
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 pr-3 hover:bg-muted rounded-lg transition-colors"
            aria-label="User menu"
            aria-expanded={showUserMenu}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <User className="w-4 h-4 text-navy-dark" />
            </div>
          </button>

          {/* User Menu Dropdown */}
          <AnimatePresence>
            {showUserMenu && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-[var(--z-dropdown)]"
                  onClick={() => setShowUserMenu(false)}
                />

                {/* Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-xl overflow-hidden z-[calc(var(--z-dropdown)+1)]"
                >
                  {/* User Info */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                        <User className="w-5 h-5 text-navy-dark" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">John Doe</p>
                        <p className="text-xs text-muted-foreground truncate">
                          john@example.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent hover:text-accent-foreground transition-colors text-left">
                      <User className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent hover:text-accent-foreground transition-colors text-left">
                      <Settings className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">Settings</span>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-border py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-destructive/10 hover:text-destructive transition-colors text-left">
                      <LogOut className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">Log out</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
