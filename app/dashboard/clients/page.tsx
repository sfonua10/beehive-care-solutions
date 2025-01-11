'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { ClientTable } from './components/client-table'
import { AddProfileForm } from './components/add-profile-form'
import { formSchema } from './schema'
import type { ProfileData } from '@/app/types'
import type { z } from 'zod'

export default function ClientsPage() {
  const [profiles, setProfiles] = useState<ProfileData[]>([
    {
      id: 1,
      type: 'client',
      fullName: 'John Doe',
      intakeDate: new Date(2023, 0, 1),
      clientSummary: 'Long-term care patient',
      team: {
        caseWorker: 'Alice Johnson',
        nurse: 'Emily White',
        attorney: 'Robert Smith'
      }
    },
    {
      id: 2,
      type: 'caseWorker',
      fullName: 'Alice Johnson',
      title: 'Senior Case Worker',
      email: 'alice@example.com',
      phone: '(555) 123-4567'
    },
    {
      id: 3,
      type: 'nurse',
      fullName: 'Emily White',
      title: 'RN',
      email: 'emily@example.com',
      phone: '(555) 234-5678'
    }
  ])

  const [open, setOpen] = useState(false)
  const [formType, setFormType] = useState<z.infer<typeof formSchema>['type']>('client')

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newProfile: ProfileData = {
      id: profiles.length + 1,
      type: values.type,
      fullName: values.fullName,
      title: values.title,
      email: values.email,
      phone: values.phone,
      intakeDate: values.type === 'client' ? values.intakeDate : undefined,
      clientSummary: values.type === 'client' ? values.clientSummary : undefined,
      medNeeds: values.type === 'client' ? values.medNeeds : undefined,
      team: values.type === 'client' ? values.team : undefined
    }
    setProfiles([...profiles, newProfile])
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Client Team</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent className={cn(
            "sm:max-w-[600px] max-h-[90vh] overflow-y-auto",
            formType === 'client' ? "sm:max-h-[85vh]" : "sm:max-h-[65vh]"
          )}>
            <DialogHeader className="sticky top-0 bg-white pb-6 z-10">
              <DialogTitle>Add New Profile</DialogTitle>
              <DialogDescription>
                Enter the details of the new profile here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <AddProfileForm 
              onSubmit={handleSubmit}
              onTypeChange={setFormType}
            />

            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>

      <ClientTable profiles={profiles} />
    </div>
  )
}

