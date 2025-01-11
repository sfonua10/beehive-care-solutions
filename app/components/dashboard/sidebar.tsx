'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  ChevronLeft, 
  ChevronRight,
  LayoutDashboard,
  Users,
  Calendar,
  Settings
} from 'lucide-react'

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)

  const handleToggle = () => setCollapsed(!collapsed)

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'Clients', href: '/dashboard/clients' },
    { icon: Calendar, label: 'Schedule', href: '/dashboard/schedule' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]

  return (
    <div
      className={cn(
        'bg-white shadow-sm relative transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-4 z-10 rounded-full bg-white shadow-md"
        onClick={handleToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors',
              collapsed && 'justify-center'
            )}
          >
            <item.icon className="h-5 w-5 text-gray-500" />
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar

