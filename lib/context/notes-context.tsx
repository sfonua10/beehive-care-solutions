'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface Note {
  id: string
  content: string
  timestamp: Date
}

interface NotesContextType {
  notes: Note[]
  addNote: (content: string) => void
  deleteNote?: (id: string) => void
  editNote?: (id: string, content: string) => void
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([])

  const addNote = (content: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      content,
      timestamp: new Date()
    }
    setNotes(prev => [newNote, ...prev])
  }

  return (
    <NotesContext.Provider value={{ notes, addNote }}>
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  const context = useContext(NotesContext)
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider')
  }
  return context
} 