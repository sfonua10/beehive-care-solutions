'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your server or a third-party service
    console.log('Form submitted:', { email, message })
    // Reset form fields
    setEmail('')
    setMessage('')
  }

  return (
    <div className="bg-blue-700">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to modernize your services?</span>
          <span className="block">Request a Beehive Care Solutions demo today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-blue-200">
          Learn how Beehive Care Solutions can help your state agency improve service delivery for people with disabilities.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email" className="sr-only">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-5 py-3 border-2 border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="message" className="sr-only">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-5 py-3 border-2 border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
              placeholder="How can Beehive Care Solutions help your agency?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit" className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 sm:w-auto">
              Request a demo
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

