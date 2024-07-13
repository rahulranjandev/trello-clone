import { z } from 'zod';

export const createTaskBoardSchema = z.object({
  params: z.object({
    projectId: z.string({ required_error: 'Project ID is required' }),
  }),
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(3, 'Name must be at least 3 characters long')
      .max(50, 'Name must be at most 50 characters long'),
  }),
});

export const getTaskBoardSchema = z.object({
  params: z.object({
    taskBoardId: z.string({ required_error: 'TaskBoard ID is required' }),
  }),
});

export const updateTaskBoardSchema = z.object({
  params: z.object({
    taskBoardId: z.string({ required_error: 'TaskBoard ID is required' }),
  }),
  body: z.object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .max(50, 'Name must be at most 50 characters long')
      .optional(),
  }),
});

export const deleteTaskBoardSchema = z.object({
  params: z.object({
    taskBoardId: z.string({ required_error: 'TaskBoard ID is required' }),
  }),
});

export type CreateTaskBoardInput = z.infer<typeof createTaskBoardSchema>;
export type GetTaskBoardInput = z.infer<typeof getTaskBoardSchema>;
export type UpdateTaskBoardInput = z.infer<typeof updateTaskBoardSchema>;
export type DeleteTaskBoardInput = z.infer<typeof deleteTaskBoardSchema>;
