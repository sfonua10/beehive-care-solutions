'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { format } from 'date-fns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ProfileData } from '@/app/types'
import { getProfiles } from '../../../../lib/profiles'

export default function ClientProfilePage() {
  const params = useParams()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [note, setNote] = useState('')

  useEffect(() => {
    const profiles = getProfiles()
    const currentProfile = profiles.find(p => p.id.toString() === params.id)
    setProfile(currentProfile || null)
  }, [params.id])

  if (!profile) return <div>Loading...</div>

  return (
    <div className="flex gap-6 h-[calc(100vh-4rem)]">
      {/* Left Sidebar - Client Details */}
      <div className="w-80 bg-white border-r border-amber-100 p-6 overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{profile.fullName}</h2>
            <p className="text-sm text-gray-500">{profile.type}</p>
          </div>

          {profile.type === 'client' && (
            <>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Intake Date</h3>
                <p className="text-sm text-gray-600">
                  {profile.intakeDate ? format(new Date(profile.intakeDate), 'PPP') : 'N/A'}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Team</h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Case Worker: {profile.team?.caseWorker || 'N/A'}</p>
                  <p className="text-sm text-gray-600">Nurse: {profile.team?.nurse || 'N/A'}</p>
                  <p className="text-sm text-gray-600">Attorney: {profile.team?.attorney || 'N/A'}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Medical Needs</h3>
                <p className="text-sm text-gray-600">{profile.medNeeds || 'N/A'}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Summary</h3>
                <p className="text-sm text-gray-600">{profile.clientSummary || 'N/A'}</p>
              </div>
            </>
          )}

          {profile.type !== 'client' && (
            <>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Contact Information</h3>
                <p className="text-sm text-gray-600">Email: {profile.email}</p>
                <p className="text-sm text-gray-600">Phone: {profile.phone}</p>
              </div>
              {profile.title && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Title</h3>
                  <p className="text-sm text-gray-600">{profile.title}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="notes" className="h-full flex flex-col">
          <TabsList className="px-6 py-2 border-b border-amber-100">
            <TabsTrigger value="activity">LOG ACTIVITY</TabsTrigger>
            <TabsTrigger value="notes">CREATE NOTE</TabsTrigger>
            <TabsTrigger value="email">SEND EMAIL</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-6">
            <TabsContent value="activity" className="mt-0 h-full">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500">No activity logged yet</div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="mt-0 h-full">
              <Card>
                <CardHeader>
                  <CardTitle>Create Note</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Type your note here..."
                    className="min-h-[200px]"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <Button>Save Note</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email" className="mt-0 h-full">
              <Card>
                <CardHeader>
                  <CardTitle>Send Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500">Email functionality coming soon</div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
} 