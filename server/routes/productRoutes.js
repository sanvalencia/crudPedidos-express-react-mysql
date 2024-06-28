import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import { verifyToken } from '../middleware/authMiddelware.js';

const router = Router();

router.post('/registerProduct', verifyToken, createProduct);
router.get('/products', verifyToken, getProducts);
router.get('/products/:id', verifyToken, getProductById);
router.put('/products/:id', verifyToken, updateProduct);
router.delete('/products/:id', verifyToken, deleteProduct);

export default router;
