import { z } from 'zod';

export const createTaskSchema = z.object({
  params: z.object({
    projectId: z.string({ required_error: 'Project ID is required' }),
  }),
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(3, 'Name is too short').max(255, 'Name is too long'),
    description: z
      .string({ required_error: 'Description is required' })
      .min(3, 'Description is too short')
      .max(255, 'Description is too long'),
    status: z
      .string({ required_error: 'Status is required' })
      .min(3, 'Status is too short')
      .max(255, 'Status is too long'),
    tags: z.array(z.string()).default([]),
    dueDate: z.string({ required_error: 'Due date is required' }),
    assignee: z.string().optional(),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    taskId: z.string({ required_error: 'Task ID is required' }),
    projectId: z.string({ required_error: 'Project ID is required' }),
  }),
  body: z.object({
    name: z.string().min(3, 'Name is too short').max(255, 'Name is too long').optional(),
    description: z.string().min(3, 'Description is too short').max(255, 'Description is too long').optional(),
    status: z.string().min(3, 'Status is too short').max(255, 'Status is too long').optional(),
    tags: z.array(z.string()).default([]).optional(),
    dueDate: z.string().optional(),
    assignee: z.string().optional(),
  }),
});

export const getTaskSchema = z.object({
  params: z.object({
    taskId: z.string({ required_error: 'Task ID is required' }),
  }),
});

export const deleteTaskSchema = z.object({
  params: z.object({
    taskId: z.string({ required_error: 'Task ID is required' }),
    projectId: z.string({ required_error: 'Project ID is required' }),
  }),
});

export const getTasksByProjectIdSchema = z.object({
  params: z.object({
    projectId: z.string({ required_error: 'Project ID is required' }),
  }),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type GetTaskInput = z.infer<typeof getTaskSchema>;
export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>;
export type GetTasksByProjectIdInput = z.infer<typeof getTasksByProjectIdSchema>;
