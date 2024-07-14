import { Router } from 'express';

const router = Router();

import AuthMiddleware from '@middlewares/authMiddleware';

import { ProjectController } from '@/controllers/projectController';
import { TaskBoardController } from '@controllers/taskBoardController';
import { createProjectSchema, updateProjectSchema, deleteProjectSchema } from '@/schema/projectSchema';
import validateSchema from '@/middlewares/validateSchema';

const authMiddleware = new AuthMiddleware();
const projectController = new ProjectController();
const taskBoardController = new TaskBoardController();

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
 * @description Get Project Board By Project ID
 * @Access User access - Protected
 * @alias GET /api/project/:projectId
 */
router.get(
  '/:projectId',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,

  taskBoardController.getTaskBoardByProjectId
);

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
  validateSchema(deleteProjectSchema),

  projectController.deleteProject
);

export default router;
