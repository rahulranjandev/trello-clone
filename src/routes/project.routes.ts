import { Router } from 'express';

const router = Router();

import AuthMiddleware from '@middlewares/authMiddleware';

import { ProjectController } from '@/controllers/projectController';
import { TaskController } from '@controllers/taskController';
import { getTasksByProjectIdSchema } from '@schema/taskSchema';
import { createProjectSchema, updateProjectSchema } from '@/schema/projectSchema';
import validateSchema from '@/middlewares/validateSchema';

const authMiddleware = new AuthMiddleware();
const projectController = new ProjectController();
const taskController = new TaskController();

/**
 * @description Create Project
 * @Access User access - Protected
 * @alias POST /api/project
 */
router.post(
  '/',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(createProjectSchema),

  projectController.createProject
);

/**
 * @description Get All Projects By User
 * @Access User access - Protected
 * @alias GET /api/project
 */
router.get('/', authMiddleware.isAuthenticated, authMiddleware.requireUser, projectController.getProjects);

/**
 * @description Update Project
 * @Access User access - Protected
 * @alias PUT /api/project/:projectId
 */
router.put(
  '/:projectId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(updateProjectSchema),

  projectController.updateProject
);

/**
 * @description Delete Project
 * @Access User access - Protected
 * @alias DELETE /api/project/:projectId
 */
router.delete(
  '/:projectId',
  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  projectController.deleteProject
);

export default router;
