import { z } from 'zod';

export const registerUserSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(3).max(50),
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, `Password must be more than 6 character's`)
      .max(50, `Password must be less than 50 character's`),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, `Password must be more than 6 character's`)
      .max(50, `Password must be less than 50 character's`),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(50).optional(),
    email: z.string().email({ message: 'Invalid email' }).optional(),
  }),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
