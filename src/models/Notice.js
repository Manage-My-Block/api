const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: { select: 'name' }
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
                autopopulate: { select: 'name' }
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
    image: String,
    // building: {
    //     type: String,
    //     required: true
    // },
    building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        required: true,
        autopopulate: { select: 'name' }
    },
});

// Enable library plugin to automatically populate ref fields
noticeSchema.plugin(require('mongoose-autopopulate'));


// Create a new notice
noticeSchema.statics.createNotice = async function (noticeData) {
    try {
        // Create new Notice
        const notice = new this(noticeData);

        // Save notice to db
        await notice.save();

        return notice;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Read a notice by ID
noticeSchema.statics.getNoticeById = async function (noticeId) {
    try {
        // Search for notice
        const notice = await this.findById(noticeId)

        // If notice not found throw error
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
        // Search for notice and update
        const notice = await this.findByIdAndUpdate(noticeId, updateData, { new: true });

        // If notice not found throw error
        if (!notice) {
            throw new Error('Notice not found');
        }

        return notice;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Add a comment to a Notice
noticeSchema.statics.addComment = async function (noticeId, newComment) {
    try {
        // Search for notice
        const notice = await this.findById(noticeId)

        // If notice not found throw error
        if (!notice) {
            throw new Error('notice not found');
        }

        // Add new comment to comments array
        notice.comments.push(newComment)

        // Save updated notice
        const updatedNotice = await this.findByIdAndUpdate(noticeId, notice, { new: true })

        return updatedNotice;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Remove a comment from a Notice
noticeSchema.statics.removeComment = async function (noticeId, commentId, userId) {
    try {

        // Find notice
        const notice = await this.findById(noticeId)

        // If not found throw error
        if (!notice) {
            throw new Error('notice not found');
        }

        // Find comment in notice, convert ObjectId to string to compare
        const foundComment = notice.comments.find(comment => comment._id.toString() === commentId)

        // If not found throw error
        if (!foundComment) {
            throw new Error('Comment not found');
        }

        // Users can only delete their own comments
        if (foundComment.user._id.toString() !== userId.toString()) {
            throw new Error('Can only delete your own comments');
        }

        // Filter the comment out
        notice.comments = notice.comments.filter(comment => comment._id.toString() !== commentId)

        // Save updated notice
        const updatedNotice = await this.findByIdAndUpdate(noticeId, notice, { new: true })

        return updatedNotice;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Delete a notice by ID
noticeSchema.statics.deleteNotice = async function (noticeId) {
    try {

        // Delete notice
        const notice = await this.findByIdAndDelete(noticeId);

        // If notice not found throw error
        if (!notice) {
            throw new Error('Notice not found');
        }

        return notice;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Create the notice model
const Notice = mongoose.model('notice', noticeSchema);

module.exports = Notice;
