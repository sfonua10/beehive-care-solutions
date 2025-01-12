'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download } from 'lucide-react'
import { ProfileData } from '@/app/types'
import { getProfiles } from '../../../../../lib/profiles'

interface Note {
  id: string
  content: string
  timestamp: Date
}

export default function ClientNotesPage() {
  const params = useParams()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [newNote, setNewNote] = useState('')
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    const profiles = getProfiles()
    const currentProfile = profiles.find(p => p.id.toString() === params.id)
    setProfile(currentProfile || null)
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) return

    const note: Note = {
      id: crypto.randomUUID(),
      content: newNote.trim(),
      timestamp: new Date()
    }

    setNotes(prev => [note, ...prev])
    setNewNote('')
  }

  const handleExport = () => {
    if (!profile || notes.length === 0) return

    const csvContent = [
      ['Date', 'Time', 'Note'],
      ...notes.map(note => [
        format(note.timestamp, 'MM/dd/yyyy'),
        format(note.timestamp, 'h:mm a'),
        note.content
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${profile.fullName.replace(/\s+/g, '_')}_notes_${format(new Date(), 'yyyy-MM-dd')}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  if (!profile) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{profile.fullName}&apos;s Notes</h1>
          <p className="text-sm text-gray-500">Record and track daily observations, medications, and important events</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
            disabled={notes.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Notes
          </Button>
        </div>
      </div>

      {/* New Note Input */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Enter your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={!newNote.trim()}>
                Add Note
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Notes Timeline */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Notes Timeline</h2>
        <div className="space-y-4">
          {notes.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500 text-center">No notes yet. Add your first note above.</p>
              </CardContent>
            </Card>
          ) : (
            notes.map(note => (
              <Card key={note.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">{note.content}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{format(note.timestamp, 'MMM d, yyyy')}</span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{format(note.timestamp, 'h:mm a')}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 