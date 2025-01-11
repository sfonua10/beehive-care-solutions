'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileData } from '@/app/types'
import { getProfiles } from '../../../../lib/profiles'

export default function ClientProfilePage() {
  const params = useParams()
  const [profile, setProfile] = useState<ProfileData | null>(null)

  useEffect(() => {
    const profiles = getProfiles()
    const currentProfile = profiles.find(p => p.id.toString() === params.id)
    setProfile(currentProfile || null)
  }, [params.id])

  if (!profile) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      {/* Client Info Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{profile.fullName}</CardTitle>
          <span className="text-sm text-muted-foreground">
            Last Updated: {format(new Date(), 'PPP')}
          </span>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold text-sm">Intake Date</h3>
            <p className="text-sm text-gray-600">
              {profile.intakeDate ? format(new Date(profile.intakeDate), 'PPP') : 'N/A'}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Care Team</h3>
            <div className="text-sm text-gray-600">
              <p>Case Worker: {profile.team?.caseWorker || 'N/A'}</p>
              <p>Nurse: {profile.team?.nurse || 'N/A'}</p>
              <p>Attorney: {profile.team?.attorney || 'N/A'}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Medical Needs</h3>
            <p className="text-sm text-gray-600">{profile.medNeeds || 'N/A'}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Daily Notes Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Daily Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">No notes recorded today</div>
          </CardContent>
        </Card>

        {/* Upcoming Events Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">No upcoming events</div>
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">No recent activity</div>
          </CardContent>
        </Card>

        {/* Tasks Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">No pending tasks</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 