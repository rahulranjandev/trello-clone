import { Router } from 'express';
import { NextFunction, Request, Response } from 'express';

const router = Router();

import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import projectRoutes from './project.routes';
import taskRoutes from './task.routes';
import taskBoardRoutes from './TaskBoard.routes';

/**
 * @description Status Routes - /health - Public Routes
 * @description Get Server Status
 * @access Public
 * @alias GET /health
 */
const status = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: 'success',
    message: 'Server is Healthy 🚀',
  });
};

router.route('/health').get(status);

/**
 * @description Auth Routes - /api/auth - Public Routes
 * @route /api/auth
 */
router.use('/api/auth', authRoutes);

/**
 * @description User Routes - /api/user - Private Routes
 * @route /api/user
 * @access Protected Routes
 */
router.use('/api/user', userRoutes);

/**
 * @description Project Routes - /api/project - Private Routes
 * @route /api/project
 * @access Protected Routes
 */
router.use('/api/project', projectRoutes);

/**
 * @description TaskBoard Routes - /api/task-board - Private Routes
 * @route /api/task-board
 * @access Protected Routes
 */
router.use('/api/task-board', taskBoardRoutes);

/**
 * @description Task Routes - /api/task - Private Routes
 * @route /api/task
 * @access Protected Routes
 */
router.use('/api/task', taskRoutes);

export default router;
