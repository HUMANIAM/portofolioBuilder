import express from 'express';
import { login, verifyToken, updateCredentials } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes
router.get('/verify', authenticateToken, verifyToken);
router.put('/update-credentials', authenticateToken, updateCredentials);

export default router;
