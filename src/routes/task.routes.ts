import { Router } from 'express';

const router = Router();

import AuthMiddleware from '@middlewares/authMiddleware';

import { TaskController } from '@controllers/taskController';
import { createTaskSchema, updateTaskSchema, getTaskSchema, deleteTaskSchema } from '@schema/taskSchema';
import validateSchema from '@/middlewares/validateSchema';

const authMiddleware = new AuthMiddleware();
const taskController = new TaskController();

/**
 * @description Create Task
 * @Access User access - Protected
 * @alias POST /api/task/:taskBoardId
 */
router.post(
  '/:taskBoardId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(createTaskSchema),

  taskController.createTask
);

/**
 * @description Get Task By ID
 * @Access User access - Protected
 * @alias GET /api/task/:taskId
 */
router.get(
  '/:taskId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(getTaskSchema),

  taskController.getTaskById
);

/**
 * @description Update Task
 * @Access User access - Protected
 * @alias PUT /api/task/:taskId
 */
router.put(
  '/:taskId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(updateTaskSchema),

  taskController.updateTask
);

/**
 * @description Delete Task
 * @Access User access - Protected
 * @alias DELETE /api/task/:taskId
 */
router.delete(
  '/:taskId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(deleteTaskSchema),

  taskController.deleteTask
);

export default router;
