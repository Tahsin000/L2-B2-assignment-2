import { z } from 'zod'

const fullNameSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
})
const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
})

export const ordersValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
})

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  fullName: fullNameSchema,
  age: z.number().min(0, 'Age must be a positive number'),
  email: z.string().email('Invalid email address'),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchema,
  isDeleted: z.boolean().default(false),
  orders: z.array(ordersValidationSchema).optional().default([]),
})
export const userUpdateValidationSchema = z.object({
  userId: z.number().optional(),
  username: z.string().min(1, 'Username is required').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  fullName: fullNameSchema,
  age: z.number().min(0, 'Age must be a positive number'),
  email: z.string().email('Invalid email address'),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchema,
  isDeleted: z.boolean().default(false),
})
