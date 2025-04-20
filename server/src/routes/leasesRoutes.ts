import express from 'express'
import { authmiddleware } from '../middleware/authMiddleware';
import { getLeases, getLeasePayments } from '../controllers/leasesController';

const router = express.Router();

router.get('/', authmiddleware(['manager', 'tenant']), getLeases);
router.get('/:id/payments', authmiddleware(['manager', 'tenant']), getLeasePayments);
export default router;