const Comment = require('../../models/Comment')

// Create a comment
exports.createComment = async (req, res) => {
    try {

        const newComment = await Comment.createComment(req.body);
        res.status(201).json(newComment);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Delete a comment by ID
exports.deleteComment = async (req, res) => {
    try {

        const deletedComment = await Comment.deleteComment(req.params.id);

        res.json(deletedComment);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};
