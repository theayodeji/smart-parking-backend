import express from 'express';
import { fetchParkingSpaces, reserveSpace, cancelReservation } from '../controllers/user.controller.js';
import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

// Route to fetch parking spaces, protected by authentication middleware
router.get('/spaces', authenticateToken, fetchParkingSpaces);
router.post('/reserve-space/:id', authenticateToken, reserveSpace);
router.post('/cancel-reservation/:id', authenticateToken, cancelReservation);

export default router;