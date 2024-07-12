import { Router } from 'express';

const router = Router();

import AuthMiddleware from '@middlewares/authMiddleware';

import { AuthController } from '@controllers/authController';

import validateSchema from '@/middlewares/validateSchema';
import { loginUserSchema, registerUserSchema } from '@schema/userSchema';

const authMiddleware = new AuthMiddleware();

const Auth = new AuthController();

/**
 * @alias   POST /api/auth/register
 * @desc    Register user
 * @access  Public
 * @body    name, email and password
 */
router.post('/register', validateSchema(registerUserSchema), Auth.register);

/**
 * @alias   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 * @body    email and password
 */
router.post('/login', validateSchema(loginUserSchema), Auth.login);

/**
 * @alias   GET /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', authMiddleware.isAuthenticated, authMiddleware.requireUser, Auth.logout);

export default router;
