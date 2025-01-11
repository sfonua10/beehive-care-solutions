'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'

export default function NewClientPage() {
  const router = useRouter()
  const [clientData, setClientData] = useState({
    fullName: '',
    dob: undefined as Date | undefined,
    intakeDate: undefined as Date | undefined,
    caseWorker: '',
    nurse: '',
    attorney: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setClientData(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined, field: 'dob' | 'intakeDate') => {
    setClientData(prev => ({ ...prev, [field]: date }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log('Submitting client data:', clientData)
    // Redirect to the clients list or the new client's profile page
    router.push('/dashboard/clients')
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Client Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={clientData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="dob">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full justify-start text-left font-normal ${!clientData.dob && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {clientData.dob ? format(clientData.dob, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={clientData.dob}
                onSelect={(date) => handleDateChange(date, 'dob')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="intakeDate">Intake Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full justify-start text-left font-normal ${!clientData.intakeDate && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {clientData.intakeDate ? format(clientData.intakeDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={clientData.intakeDate}
                onSelect={(date) => handleDateChange(date, 'intakeDate')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="caseWorker">Case Worker</Label>
          <Input
            id="caseWorker"
            name="caseWorker"
            value={clientData.caseWorker}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="nurse">Nurse</Label>
          <Input
            id="nurse"
            name="nurse"
            value={clientData.nurse}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="attorney">Attorney</Label>
          <Input
            id="attorney"
            name="attorney"
            value={clientData.attorney}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" className="w-full">Create Client Profile</Button>
      </form>
    </div>
  )
}

