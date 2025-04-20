import express from 'express';
import verifyToken from '../middleware/authmiddleware.js';
import { updateProfile, getUserProfile, changePassword } from '../controllers/userController.js';

const router = express.Router();


// upate user profile route
router.put('/profile', verifyToken, updateProfile);

// Retrieve user profile information route
router.get('/profile', verifyToken, getUserProfile);

// Change user password
router.put('/profile/password', verifyToken, changePassword);

// Upload user profile picture

export default router;