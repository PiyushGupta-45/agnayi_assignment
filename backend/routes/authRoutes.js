import express from 'express';
import { body, validationResult } from 'express-validator';
import { login } from '../controllers/authController.js';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        details: errors.array()
      });
    }

    next();
  },
  login
);

export default router;
