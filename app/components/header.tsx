import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">Beehive Care Solutions</span>
              <svg className="h-10 w-auto text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.2 8.2L12 3l6.8 5.2-2.6 8H7.8l-2.6-8zM12 12.5l-2.9 2.9h5.8L12 12.5z" />
              </svg>
            </Link>
            <span className="ml-3 text-xl font-bold text-gray-900">Beehive Care Solutions</span>
            <div className="hidden ml-10 space-x-8 lg:block">
              <Link href="#features" className="text-base font-medium text-gray-600 hover:text-gray-900">
                Features
              </Link>
              <Link href="#testimonials" className="text-base font-medium text-gray-600 hover:text-gray-900">
                Testimonials
              </Link>
              <Link href="#compliance" className="text-base font-medium text-gray-600 hover:text-gray-900">
                Compliance
              </Link>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-700 hover:bg-blue-50">
                Sign in
              </Button>
            </Link>
            <Button className="inline-block py-2 px-4 border border-transparent rounded-md text-base font-medium text-white bg-blue-700 hover:bg-blue-800">
              Request Demo
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}

