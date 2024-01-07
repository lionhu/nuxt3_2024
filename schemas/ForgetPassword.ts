import { z } from 'zod'

export const ForgetPasswordSchema = z.object({
  email: z.string().email('Invalid email'),
})

export type Schema = z.output<typeof ForgetPasswordSchema>

// import { LoginSchema } from '../../schemas/login'
// import type { Schema } from '../../schemas/login'
