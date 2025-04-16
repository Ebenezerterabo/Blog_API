import express from 'express';
import verifyToken from '../middleware/authmiddleware.js';
import User from '../models/userModel.js';

const router = express.Router();


// upate user profile
router.put('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (user) {
            user.username = req.body.username ?? user.username;
            user.avatar = req.body.avatar;
            user.bio = req.body.bio ?? user.bio;
            await user.save();
            res.status(200).json({ message: 'User profile updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, user: req.user });
    }
});

// Retrieve user profile information 
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, user: req.user });
    }
});

export default router;