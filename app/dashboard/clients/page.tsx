'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Plus } from 'lucide-react'

interface ClientData {
  id: number
  fullName: string
  dob: Date | undefined
  intakeDate: Date | undefined
  caseWorker: string
  nurse: string
  attorney: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientData[]>([
    { id: 1, fullName: 'John Doe', dob: new Date(1990, 0, 1), intakeDate: new Date(2023, 0, 1), caseWorker: 'Alice Johnson', nurse: 'Emily White', attorney: 'Robert Smith' },
    { id: 2, fullName: 'Jane Smith', dob: new Date(1985, 5, 15), intakeDate: new Date(2023, 1, 15), caseWorker: 'Bob Williams', nurse: 'David Brown', attorney: 'Sarah Davis' },
    { id: 3, fullName: 'Mike Brown', dob: new Date(1978, 8, 30), intakeDate: new Date(2023, 2, 1), caseWorker: 'Carol Davis', nurse: 'Michael Green', attorney: 'Jennifer Lee' },
  ])

  const [newClient, setNewClient] = useState<ClientData>({
    id: 0,
    fullName: '',
    dob: undefined,
    intakeDate: undefined,
    caseWorker: '',
    nurse: '',
    attorney: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewClient(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined, field: 'dob' | 'intakeDate') => {
    setNewClient(prev => ({ ...prev, [field]: date }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...clients.map(c => c.id)) + 1
    setClients(prev => [...prev, { ...newClient, id: newId }])
    setNewClient({
      id: 0,
      fullName: '',
      dob: undefined,
      intakeDate: undefined,
      caseWorker: '',
      nurse: '',
      attorney: ''
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Enter the details of the new client here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={newClient.fullName}
                  onChange={handleInputChange}
                  required
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!newClient.dob && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newClient.dob ? format(newClient.dob, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newClient.dob}
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
                      className={`w-full justify-start text-left font-normal ${!newClient.intakeDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newClient.intakeDate ? format(newClient.intakeDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newClient.intakeDate}
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
                  value={newClient.caseWorker}
                  onChange={handleInputChange}
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
              <div>
                <Label htmlFor="nurse">Nurse</Label>
                <Input
                  id="nurse"
                  name="nurse"
                  value={newClient.nurse}
                  onChange={handleInputChange}
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
              <div>
                <Label htmlFor="attorney">Attorney</Label>
                <Input
                  id="attorney"
                  name="attorney"
                  value={newClient.attorney}
                  onChange={handleInputChange}
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
              <Button type="submit">Save Client</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-amber-100">
        <table className="min-w-full divide-y divide-amber-200">
          <thead className="bg-amber-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Date of Birth</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Intake Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Case Worker</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Nurse</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Attorney</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-amber-100">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-amber-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.dob ? format(client.dob, "PPP") : 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.intakeDate ? format(client.intakeDate, "PPP") : 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.caseWorker}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.nurse}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.attorney}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

