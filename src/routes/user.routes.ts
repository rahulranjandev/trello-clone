import { Router } from 'express';

const router = Router();

import AuthMiddleware from '@middlewares/authMiddleware';

import { UserController } from '@controllers/userController';
import validateSchema from '@/middlewares/validateSchema';
import { updateUserSchema } from '@schema/userSchema';

const authMiddleware = new AuthMiddleware();

const User = new UserController();

/**
 * @description Get User - /api/user - Private Routes
 * @access User Access - Private
 * @alias GET /api/user
 */
router.get(
  '/',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,

  User.getUser
);

/**
 * @description Update User - /api/user - Private Routes
 * @access User Access - Private
 * @alias PUT /api/user
 */
router.put(
  '/',

  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(updateUserSchema),

  User.updateUser
);

export default router;
