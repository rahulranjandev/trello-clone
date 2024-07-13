import { Router } from 'express';

const router = Router();

import AuthMiddleware from '@middlewares/authMiddleware';

import { TaskController } from '@controllers/taskController';
import { createTaskSchema, updateTaskSchema, getTaskSchema, deleteTaskSchema } from '@schema/taskSchema';
import validateSchema from '@/middlewares/validateSchema';

const authMiddleware = new AuthMiddleware();
const taskController = new TaskController();

router.post(
  '/:projectId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(createTaskSchema),

  taskController.createTask
);

router.get(
  '/:taskId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(getTaskSchema),

  taskController.getTaskById
);

router.put(
  '/:projectId/task/:taskId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(updateTaskSchema),

  taskController.updateTask
);

router.delete(
  '/:projectId/task/:taskId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(deleteTaskSchema),

  taskController.deleteTask
);

export default router;
