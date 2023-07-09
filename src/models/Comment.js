const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create a new comment
commentSchema.statics.createComment = async function (commentData) {
    try {

        const comment = new this(commentData);

        await comment.save();

        return comment;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Delete a comment by ID
commentSchema.statics.deleteComment = async function (commentId) {
    try {

        const comment = await this.findByIdAndDelete(commentId);

        if (!comment) {
            throw new Error('Comment not found');
        }

        return comment;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Create the comment model
const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
