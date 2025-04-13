import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';


dotenv.config();
const router = express.Router();


// create a new user
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body

    try {
        const newUser = new User({ username, email, password, role });
        await newUser.save();
        res.status(201).json({ message: 'registered successfully' });
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const jwt_secret = process.env.JWT_TOKEN;
        const token = jsonwebtoken.sign({ userId: user._id, role: user.role }, jwt_secret, { expiresIn: '1h' });
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;