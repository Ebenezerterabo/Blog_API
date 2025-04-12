import express from 'express';
import jsonwebtoken from 'jsonwebtoken'
import User from '../models/userModel.js'

const router = express.Router();


// create a new user
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body

    try {
        const newUser = new User({username, email, password, role});
        await newUser.save();
        res.status(201).json({ message: 'registered successfully'});
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
});