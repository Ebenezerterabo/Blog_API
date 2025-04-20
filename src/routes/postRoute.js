import express from 'express';
import verifyToken from '../middleware/authmiddleware.js';
import { createPost, getPost, 
    getAllPosts, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

// Create a new post route
router.post('/posts', verifyToken, createPost);

// Retrieve a post route
router.get('/posts/:id', getPost);

// Retrieve all posts route
router.get('/posts', verifyToken, getAllPosts);

// Update a post route
router.put('/posts/:id', verifyToken, updatePost);

// Delete a post route
router.delete('/posts/:id', verifyToken, deletePost);

export default router;