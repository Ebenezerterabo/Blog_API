import Comment from "../models/commentModel.js";

// Create a new comment
export const createComment = async (req, res) => {
    const { content } = req.body;
    const author = req.user.userId;
    const postId = req.params.id;

    try {
        const newComment = new Comment({ content, author, postId });
        await newComment.save();
        res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Retrieve a comment
export const getComment = async (req, res) => {
    const { postId } = req.params;
    try {
        const comment = await Comment.find({ post: postId }).populate('author', 'username');
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

