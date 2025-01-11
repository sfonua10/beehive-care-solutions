import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
        <div className="prose max-w-none bg-white p-8 rounded-lg shadow">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-xl font-semibold mt-8">1. Acceptance of Terms</h2>
          <p>By accessing BeeHive Care Solutions, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

          <h2 className="text-xl font-semibold mt-8">2. Healthcare Information</h2>
          <p>Our service involves the management of sensitive healthcare information. Users must:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain confidentiality of access credentials</li>
            <li>Report any unauthorized access immediately</li>
            <li>Use the service in compliance with HIPAA regulations</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8">3. User Responsibilities</h2>
          <ul>
            <li>Maintain accurate client records</li>
            <li>Protect access credentials</li>
            <li>Report security concerns promptly</li>
            <li>Comply with healthcare regulations</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8">4. Service Availability</h2>
          <p>While we strive for maximum uptime, we cannot guarantee uninterrupted access. We reserve the right to:</p>
          <ul>
            <li>Perform maintenance with notice</li>
            <li>Update features and functionality</li>
            <li>Modify or discontinue services</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 