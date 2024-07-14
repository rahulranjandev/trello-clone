import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(3).max(50),
    description: z.string({ required_error: 'Description is required' }).min(3).max(500),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    projectId: z.string({ required_error: 'Project ID is required' }),
  }),
  body: z.object({
    name: z.string().min(3).max(50).optional(),
    description: z.string().min(3).max(500).optional(),
  }),
});

export const deleteProjectSchema = z.object({
  params: z.object({
    projectId: z.string({ required_error: 'Project ID is required' }),
  }),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type DeleteProjectInput = z.infer<typeof deleteProjectSchema>;
