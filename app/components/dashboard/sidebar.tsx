import Link from 'next/link'
import { Home, Users, UserPlus, FileText, Settings, HelpCircle } from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Clients', href: '/dashboard/clients' },
  { icon: UserPlus, label: 'New Client', href: '/dashboard/clients/new' },
  { icon: FileText, label: 'Reports', href: '/dashboard/reports' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  { icon: HelpCircle, label: 'Help', href: '/dashboard/help' },
]

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-white border-r border-amber-100 shadow-lg">
      <div className="flex items-center justify-center h-20 border-b border-amber-100">
        <h1 className="text-3xl font-bold text-amber-600">BeeHive Care</h1>
      </div>
      <nav className="flex-grow">
        <ul className="flex flex-col py-4">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="flex items-center px-6 py-3 text-gray-700 hover:bg-amber-50 transition-colors duration-200">
                <item.icon className="h-5 w-5 mr-3 text-amber-600" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

