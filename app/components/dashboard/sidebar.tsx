'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Users, 
  UserPlus, 
  FileText, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Clients', href: '/dashboard/clients' },
  { icon: UserPlus, label: 'New Client', href: '/dashboard/clients/new' },
  { icon: FileText, label: 'Reports', href: '/dashboard/reports' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  { icon: HelpCircle, label: 'Help', href: '/dashboard/help' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex flex-col bg-white border-r border-amber-100 shadow-lg transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header with collapse button */}
      <div
        className={cn(
          "flex items-center h-20 border-b border-amber-100",
          collapsed ? "justify-center" : "justify-between px-6"
        )}
      >
        {!collapsed && (
          <h1 className="text-2xl font-bold text-amber-600">
            BeeHive Care
          </h1>
        )}
        <button
          type="button"
          className="p-2 rounded hover:bg-amber-50 transition-colors"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 text-amber-600" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-amber-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="flex flex-col py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center py-3 transition-colors duration-200",
                    // Adjust padding to handle the smaller/collapsed state
                    collapsed ? "px-4 justify-center" : "px-6",
                    isActive
                      ? "bg-amber-50 text-amber-900"
                      : "text-gray-700 hover:bg-amber-50"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 text-gray-400 transition-colors duration-200",
                      isActive ? "text-amber-600" : "",
                      // If collapsed, remove the right margin
                      collapsed && "mr-0"
                    )}
                  />
                  {/* Label is hidden when collapsed */}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
