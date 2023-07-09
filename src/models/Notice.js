const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    comments: [
        {
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
            },
        },
    ],
    images: [String]
});

// Create a new notice
noticeSchema.statics.createNotice = async function (noticeData) {
    try {
        const notice = new this(noticeData);
        await notice.save();
        return notice;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Read a notice by ID
noticeSchema.statics.getNoticeById = async function (noticeId) {
    try {
        const notice = await this.findById(noticeId)
            .populate('author', 'name')
            .populate('comments.user', 'name');
        if (!notice) {
            throw new Error('notice not found');
        }
        return notice;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update a notice by ID
noticeSchema.statics.updateNotice = async function (noticeId, updateData) {
    try {
        const notice = await this.findByIdAndUpdate(noticeId, updateData, { new: true });
        if (!notice) {
            throw new Error('notice not found');
        }
        return notice;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Add a comment to a Todo
noticeSchema.statics.addComment = async function (noticeId, newComment) {
    try {

        const notice = await this.findById(noticeId)

        if (!notice) {
            throw new Error('notice not found');
        }

        notice.comments.push(newComment)

        return notice;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Remove a comment from a Todo
noticeSchema.statics.removeComment = async function (noticeId, removedComment) {
    try {

        const notice = await this.findById(noticeId)

        if (!notice) {
            throw new Error('notice not found');
        }

        notice.comments = notice.comments.filter(comment => comment.user !== removedComment.user)

        return notice;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Delete a notice by ID
noticeSchema.statics.deleteNotice = async function (noticeId) {
    try {
        const notice = await this.findByIdAndDelete(noticeId);
        if (!notice) {
            throw new Error('notice not found');
        }
        return notice;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Create the notice model
const Notice = mongoose.model('notice', noticeSchema);

module.exports = Notice;
