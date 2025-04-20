import express from 'express';
import { registerUser, loginUser } from '../controllers/authRoute.controller.js';

const router = express.Router();


// create a new user route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

export default router;