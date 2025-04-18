import express from 'express';
import verifyToken from '../middleware/authmiddleware.js';
import Post from '../models/postModel.js';

const router = express.Router();

// Create a new post
router.post('/posts', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    const author = req.user.userId;

    try {
        const newPost = new Post({ title, content, author });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve a post
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a post
router.put('/posts/:id',)

export default router;