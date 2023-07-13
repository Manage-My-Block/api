const Notice = require('../../models/Notice')

// Create a notice
const createNotice = async (req, res) => {
    try {
        // Create a notice
        const notice = await Notice.createNotice(req.body);

        // Return new notice data
        res.status(201).json(notice);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get all notices
const getAllNotices = async (req, res) => {
    try {
        // Search for all notices
        const notices = await Notice.find();

        // Return notice list
        res.json(notices);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get a notice by ID
const getNoticeById = async (req, res) => {
    try {
        // Search for notice
        const notice = await Notice.getNoticeById(req.params.id);

        // Return notice
        res.json(notice);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Update a notice by ID
const updateNotice = async (req, res) => {
    try {
        // Search for notice
        const foundNotice = await Notice.findById(req.params.id)

        // If notice not found throw error
        if (!foundNotice) {
            throw new Error('Notice not found');
        }

        // Only admin or committee or notice owner can update a notice
        if ((req.user.role.role !== 'admin' || req.user.role.role !== 'committee') && req.user._id.toString() !== foundNotice.author._id.toString()) {
            throw new Error('Unauthorized');
        }

        // Make notice update
        const notice = await Notice.updateNotice(req.params.id, req.body);

        res.json(notice);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Add a comment to a todo
const addCommentNotice = async (req, res) => {
    try {
        // Add comment to notice
        const notice = await Notice.addComment(req.params.id, req.body);

        // Return updated notice
        res.json(notice);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Remove a comment from a todo
const removeCommentNotice = async (req, res) => {
    try {
        // Remove comment from notice
        const notice = await Notice.removeComment(req.params.id, req.params.commentId, req.user._id);

        // Return updated notice
        res.json(notice);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Delete a notice by ID
const deleteNotice = async (req, res) => {
    try {

        // Search for notice
        const foundNotice = await Notice.findById(req.params.id)

        // If notice not found throw error
        if (!foundNotice) {
            throw new Error('Notice not found');
        }

        // Only admin or committee or notice owner can update a notice
        if ((req.user.role.role !== 'admin' || req.user.role.role !== 'committee') && req.user._id.toString() !== foundNotice.author._id.toString()) {
            throw new Error('Unauthorized');
        }

        // Delete notice
        const notice = await Notice.deleteNotice(req.params.id);

        // Return deleted notice
        res.json(notice);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    createNotice,
    getAllNotices,
    getNoticeById,
    updateNotice,
    addCommentNotice,
    removeCommentNotice,
    deleteNotice
}