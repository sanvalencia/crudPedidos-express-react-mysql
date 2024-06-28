import { Router } from "express";
import {createUser, login, logout} from "../controllers/authController.js";
import { verifyToken } from '../middleware/authMiddelware.js';

const router = Router();

router.post('/registerUser', createUser);
router.post('/login', login);
router.post('/logout', logout); 

export default router;