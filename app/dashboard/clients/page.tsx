'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { CalendarIcon, Plus, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from "@/lib/utils"

const formSchema = z.object({
  type: z.enum(['client', 'caseWorker', 'nurse', 'attorney']),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  intakeDate: z.date().optional(),
  clientSummary: z.string().optional(),
  medNeeds: z.string().optional(),
  team: z.object({
    caseWorker: z.string().optional(),
    nurse: z.string().optional(),
  }).optional(),
})

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

  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'client',
      team: {},
    },
  })

  const userType = form.watch('type')

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.type === 'client') {
      const newClient: ClientData = {
        id: clients.length + 1,
        fullName: values.fullName,
        dob: undefined,
        intakeDate: values.intakeDate,
        caseWorker: values.team?.caseWorker || '',
        nurse: values.team?.nurse || '',
        attorney: ''
      }
      setClients([...clients, newClient])
    }
    setOpen(false)
    form.reset()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent className={cn(
            "sm:max-w-[600px] max-h-[90vh] overflow-y-auto",
            // Make dialog taller for client type
            userType === 'client' ? "sm:max-h-[85vh]" : "sm:max-h-[65vh]"
          )}>
            <DialogHeader className="sticky top-0 bg-white pb-6 z-10">
              <DialogTitle>Add New Profile</DialogTitle>
              <DialogDescription>
                Enter the details of the new profile here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of User</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-amber-200 focus:ring-amber-400">
                            <SelectValue placeholder="Select user type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="client">Client</SelectItem>
                          <SelectItem value="caseWorker">Case Worker</SelectItem>
                          <SelectItem value="nurse">Nurse</SelectItem>
                          <SelectItem value="attorney">Attorney</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="border-amber-200 focus:ring-amber-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {userType !== 'client' && (
                  <>
                    {userType === 'caseWorker' && (
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                className="border-amber-200 focus:ring-amber-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email"
                              className="border-amber-200 focus:ring-amber-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              type="tel"
                              className="border-amber-200 focus:ring-amber-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {userType === 'client' && (
                  <>
                    <FormField
                      control={form.control}
                      name="intakeDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Intake Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={`w-full pl-3 text-left font-normal border-amber-200 ${!field.value && "text-muted-foreground"}`}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="clientSummary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client Summary</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="min-h-[150px] border-amber-200 focus:ring-amber-400"
                              placeholder="Previous placements, rights restrictions, allergies, care history..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="medNeeds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medical Needs</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="min-h-[100px] border-amber-200 focus:ring-amber-400"
                              placeholder="Current medications, medical conditions, special care requirements..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Team Information</h3>
                      <FormField
                        control={form.control}
                        name="team.caseWorker"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Case Worker</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-amber-200 focus:ring-amber-400">
                                  <SelectValue placeholder="Select case worker" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">John Doe</SelectItem>
                                <SelectItem value="2">Jane Smith</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="team.nurse"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nurse</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-amber-200 focus:ring-amber-400">
                                  <SelectValue placeholder="Select nurse" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">Sarah Johnson</SelectItem>
                                <SelectItem value="2">Mike Brown</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white"
                >
                  Create Profile
                </Button>
              </form>
            </Form>

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

