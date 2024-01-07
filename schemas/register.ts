import { z } from 'zod'

export const RegisterSchema = z
  .object({
    username: z
      .string({ invalid_type_error: 'please input a valid name' })
      .min(6, 'at least 6 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Must be at least 6 characters'),
    passwordConfirm: z.string().min(6, 'Must be at least 6 characters'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  })
export type Schema = z.output<typeof RegisterSchema>

// import { RegisterSchema } from '../../schemas/login'
// import type { Schema } from '../../schemas/login'
