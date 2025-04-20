import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

// Register a new user
export const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ username, email, password, role });
        await newUser.save();
        res.status(201).json({ message: 'registered successfully' });
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

// User login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await user.comparePassword(password)

        if (isPasswordValid) {
            // Generate token for authentication
            const jwt_secret = process.env.JWT_SECRET;
            const payload = { userId: user._id, role: user.role };
            const token = jwt.sign(payload, jwt_secret, { expiresIn: '1h' });
            const message = 'logged in successfully';
            res.status(200).json({ token, message });
        } else {
            return res.status(401).json({ error: 'Invalid password'});
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}