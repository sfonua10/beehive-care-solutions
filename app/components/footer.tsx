import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
              About
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
              Features
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
              Compliance
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
              Privacy Policy
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
              Terms of Service
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2023 Beehive Care Solutions. All rights reserved. Designed to support state disability services.
        </p>
      </div>
    </footer>
  )
}

