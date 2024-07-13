import { Router } from 'express';

const router = Router();

import AuthMiddleware from '@middlewares/authMiddleware';

import { TaskBoardController } from '@controllers/taskBoardController';
import {
  createTaskBoardSchema,
  getTaskBoardSchema,
  updateTaskBoardSchema,
  deleteTaskBoardSchema,
} from '@schema/taskBoardSchema';
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
 * @description Get TaskBoard By Project ID
 * @Access User access - Protected
 * @alias GET /api/task-board/:projectId
 */
router.get(
  '/:projectId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,

  taskBoardController.getTaskBoardByProjectId
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
 * @description Get TaskBoard By Project ID
 * @Access User access - Protected
 * @alias GET /api/task-board/:taskBoardId
 */
router.delete(
  '/:taskBoardId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(deleteTaskBoardSchema),

  taskBoardController.deleteTaskBoard
);

export default router;
