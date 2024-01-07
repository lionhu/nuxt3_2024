import { z } from 'zod'

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Must be at least 6 characters'),
    passwordConfirm: z.string().min(6, 'Must be at least 6 characters'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  })
export type Schema = z.output<typeof ResetPasswordSchema>

// import { RegisterSchema } from '../../schemas/login'
// import type { Schema } from '../../schemas/login'
