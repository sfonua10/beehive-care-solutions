'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
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
import { formSchema } from '@/app/dashboard/clients/schema'

interface AddProfileFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void
  onTypeChange: (type: z.infer<typeof formSchema>['type']) => void
}

export function AddProfileForm({ onSubmit, onTypeChange }: AddProfileFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'client',
      team: {},
    },
  })

  const userType = form.watch('type')

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    onSubmit(values)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pb-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of User</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value)
                  onTypeChange(value as z.infer<typeof formSchema>['type'])
                }} 
                defaultValue={field.value}
              >
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
  )
} 