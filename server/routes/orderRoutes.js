import { Router } from 'express';
import { createOrder, getOrders, getOrderById, deleteOrder, updateOrder, getOrderProducts } from '../controllers/orderController.js';
import { verifyToken } from '../middleware/authMiddelware.js';

const router = Router();

router.post('/registerOrder', verifyToken, createOrder);
router.get('/orders', verifyToken, getOrders);
router.get('/orders/:id', verifyToken, getOrderById);
router.put('/orders/:id', verifyToken, updateOrder);
router.delete('/orders/:id', verifyToken, deleteOrder);
router.get('/orders/:id/products', verifyToken, getOrderProducts);

export default router;
