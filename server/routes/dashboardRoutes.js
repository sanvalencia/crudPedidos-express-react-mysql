import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddelware.js';
import {getOrderCountByUser, getProductsCount, getOrderMonth} from '../controllers/dashboardController.js'

const router = Router();


router.get('/dashboard/countorder', verifyToken, getOrderCountByUser);
router.get('/dashboard/countproduct', verifyToken, getProductsCount);
router.get('/dashboard/ordermonth', verifyToken, getOrderMonth);

export default router;