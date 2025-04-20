import express from 'express';
import verifyToken from '../middleware/authmiddleware.js';
import { createComment, getComment, getAllComments } from '../controllers/commentController.js';

const router = express.Router();

// Create a new comment
router.post('/:postId/comments', verifyToken, createComment);

// Retrieve a comment
router.get('/:postId/comments', verifyToken, getComment);

export default router;