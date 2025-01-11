import { ProfileData } from '@/app/types'

export const getProfiles = (): ProfileData[] => {
  if (typeof window === 'undefined') return []
  const profiles = localStorage.getItem('profiles')
  return profiles ? JSON.parse(profiles) : []
}

export const addProfile = (profile: ProfileData) => {
  const profiles = getProfiles()
  const newProfiles = [...profiles, { ...profile, id: profiles.length + 1 }]
  localStorage.setItem('profiles', JSON.stringify(newProfiles))
  return newProfiles
} 