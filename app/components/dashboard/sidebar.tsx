'use client'

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
import { useSidebar } from '@/app/hooks/use-sidebar'

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
  const { isOpen, toggle } = useSidebar()

  return (
    <div
      className={cn(
        "flex flex-col bg-white border-r border-amber-100 shadow-lg transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div
        className={cn(
          "flex items-center h-20 border-b border-amber-100",
          isOpen ? "justify-between px-6" : "justify-center"
        )}
      >
        {isOpen && (
          <h1 className="text-2xl font-bold text-amber-600">
            BeeHive Care
          </h1>
        )}
        <button
          type="button"
          className="p-2 rounded hover:bg-amber-50 transition-colors"
          onClick={toggle}
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5 text-amber-600" />
          ) : (
            <ChevronRight className="h-5 w-5 text-amber-600" />
          )}
        </button>
      </div>

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
                    isOpen ? "px-6" : "px-4 justify-center",
                    isActive
                      ? "bg-amber-50 text-amber-900"
                      : "text-gray-700 hover:bg-amber-50"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isOpen ? "mr-3" : "mr-0",
                      isActive ? "text-amber-600" : "text-gray-400"
                    )}
                  />
                  {isOpen && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
