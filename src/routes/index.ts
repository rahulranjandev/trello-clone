import { Router } from 'express';
import { NextFunction, Request, Response } from 'express';

const router = Router();

/**
 * @description Status Routes - / - Public Routes
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

export default router;
