import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
        <div className="prose max-w-none bg-white p-8 rounded-lg shadow">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold mt-8">1. Information We Collect</h2>
          <p>At BeeHive Care Solutions, we take your privacy seriously. We collect and process the following types of information:</p>
          <ul>
            <li>Personal identification (name, date of birth, contact details)</li>
            <li>Healthcare-related information for care management</li>
            <li>Login credentials and authentication data</li>
            <li>Usage data and system interactions</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8">2. HIPAA Compliance</h2>
          <p>We maintain HIPAA compliance and protect your health information through:</p>
          <ul>
            <li>Encrypted data storage and transmission</li>
            <li>Strict access controls and authentication</li>
            <li>Regular security audits and monitoring</li>
            <li>Staff training on privacy procedures</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8">3. How We Use Your Information</h2>
          <ul>
            <li>Providing care management services</li>
            <li>Coordinating with healthcare providers</li>
            <li>Maintaining and improving our services</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8">4. Data Protection</h2>
          <p>We implement robust security measures including:</p>
          <ul>
            <li>End-to-end encryption</li>
            <li>Regular security assessments</li>
            <li>Access logging and monitoring</li>
            <li>Secure backup procedures</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 