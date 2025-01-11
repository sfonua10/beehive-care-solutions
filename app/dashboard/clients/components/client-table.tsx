'use client'

import { format } from 'date-fns'
import { ProfileData } from '@/app/types'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useSidebar } from '@/app/hooks/use-sidebar'

interface ClientTableProps {
  profiles: ProfileData[]
}

export function ClientTable({ profiles }: ClientTableProps) {
  const router = useRouter()
  const { close } = useSidebar()

  const handleRowClick = (profileId: number) => {
    close()
    router.push(`/dashboard/clients/${profileId}`)
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-amber-100">
      <table className="min-w-full divide-y divide-amber-200">
        <thead className="bg-amber-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Title/Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Details</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-amber-100">
          {profiles.map((profile) => (
            <tr 
              key={profile.id} 
              className="hover:bg-amber-50 transition-colors duration-200 cursor-pointer" 
              onClick={() => handleRowClick(profile.id)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                  {
                    "bg-blue-100 text-blue-800": profile.type === 'client',
                    "bg-purple-100 text-purple-800": profile.type === 'caseWorker',
                    "bg-green-100 text-green-800": profile.type === 'nurse',
                    "bg-orange-100 text-orange-800": profile.type === 'attorney',
                  }
                )}>
                  {profile.type === 'caseWorker' ? 'Case Worker' : 
                   profile.type.charAt(0).toUpperCase() + profile.type.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {profile.fullName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {profile.type === 'client' ? 
                  (profile.intakeDate ? `Intake: ${format(profile.intakeDate, "PPP")}` : 'N/A') : 
                  profile.title || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {profile.type !== 'client' ? (
                  <div>
                    <div>{profile.email}</div>
                    <div>{profile.phone}</div>
                  </div>
                ) : (
                  <div>
                    {profile.team?.caseWorker && <div>Case Worker: {profile.team.caseWorker}</div>}
                    {profile.team?.nurse && <div>Nurse: {profile.team.nurse}</div>}
                    {profile.team?.attorney && <div>Attorney: {profile.team.attorney}</div>}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {profile.type === 'client' ? (
                  <div className="max-w-xs truncate">
                    {profile.clientSummary || 'No summary available'}
                  </div>
                ) : (
                  'N/A'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 