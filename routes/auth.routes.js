import express from 'express';
import { registerUser, loginUser, checkAuth, logoutUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/checkauth', checkAuth);
router.post('/logout', logoutUser);

export default router;