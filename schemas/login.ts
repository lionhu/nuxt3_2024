import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

export type Schema = z.output<typeof LoginSchema>

// import { LoginSchema } from '../../schemas/login'
// import type { Schema } from '../../schemas/login'
