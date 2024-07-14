import { Router } from 'express';

const router = Router();

import AuthMiddleware from '@middlewares/authMiddleware';

import { TaskBoardController } from '@controllers/taskBoardController';
import { createTaskBoardSchema, updateTaskBoardSchema, deleteTaskBoardSchema } from '@schema/taskBoardSchema';
import validateSchema from '@/middlewares/validateSchema';

const authMiddleware = new AuthMiddleware();
const taskBoardController = new TaskBoardController();

/**
 * @description Create TaskBoard
 * @Access User access - Protected
 * @alias POST /api/task-board/:projectId
 */
router.post(
  '/:projectId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(createTaskBoardSchema),

  taskBoardController.createTaskBoard
);

/**
 * @description Update TaskBoard
 * @Access User access - Protected
 * @alias PUT /api/task-board/:taskBoardId
 */
router.put(
  '/:taskBoardId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(updateTaskBoardSchema),

  taskBoardController.updateTaskBoard
);

/**
 * @description Delete TaskBoard
 * @Access User access - Protected
 * @alias DELETE /api/task-board/:taskBoardId
 */
router.delete(
  '/:taskBoardId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(deleteTaskBoardSchema),

  taskBoardController.deleteTaskBoard
);

export default router;
