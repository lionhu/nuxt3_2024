import { z } from 'zod'

export const AddressbookSchema = z.object({
  name: z.string().min(2, 'at least 2 characters'),
  address_last: z.string().min(2, 'at least 2 characters'),
  address_first: z.string().min(2, 'at least 2 characters'),
  phone: z.string().min(2, 'at least 2 characters'),
  email: z.string().email('Invalid email'),
  postcode: z.string().min(6, 'at least 6 characters'),
  as_default: z.boolean(),
})
export type Schema = z.output<typeof AddressbookSchema>

// import { RegisterSchema } from '../../schemas/login'
// import type { Schema } from '../../schemas/login'
