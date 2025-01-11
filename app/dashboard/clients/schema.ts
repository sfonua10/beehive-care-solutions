import * as z from 'zod'

export const formSchema = z.object({
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