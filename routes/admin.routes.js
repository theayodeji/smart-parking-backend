import express from 'express';
import { adminLogin, registerAdmin, adminLogout } from '../controllers/auth.controller.js';
import { fetchLogs } from '../controllers/user.controller.js';
import { authenticateAdmin } from '../utils/adminAuth.js';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/register', registerAdmin);
router.post('/logout', adminLogout);

// Only admins can access logs
router.get('/logs', authenticateAdmin, fetchLogs);

export default router;
