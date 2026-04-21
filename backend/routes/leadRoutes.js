import express from 'express';
import { body } from 'express-validator';
import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLead
} from '../controllers/leadController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { leadStatuses } from '../models/Lead.js';

const router = express.Router();

const leadValidation = [
  body('name').optional({ values: 'falsy' }).trim().notEmpty().withMessage('Name is required'),
  body('phone').optional({ values: 'falsy' }).trim().notEmpty().withMessage('Phone is required'),
  body('email').optional({ values: 'falsy' }).isEmail().withMessage('Enter a valid email'),
  body('budget')
    .optional({ values: 'falsy' })
    .isFloat({ min: 0 })
    .withMessage('Budget must be a positive number'),
  body('status')
    .optional()
    .isIn(leadStatuses)
    .withMessage(`Status must be one of: ${leadStatuses.join(', ')}`)
];

const createLeadValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  ...leadValidation.slice(2)
];

router.use(authMiddleware);

router.route('/').get(getLeads).post(createLeadValidation, createLead);
router.route('/:id').get(getLeadById).put(leadValidation, updateLead).delete(deleteLead);

export default router;
