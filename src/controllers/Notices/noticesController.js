const Notice = require('../../models/Notice')

// Create a notice
const createNotice = async (req, res) => {
    try {

        const newNotice = await Notice.createNotice(req.body);

        res.status(201).json(newNotice);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get all notices
const getAllNotices = async (req, res) => {
    try {

        const notices = await Notice.find();
        res.json(notices);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get a notice by ID
const getNoticeById = async (req, res) => {
    try {

        const notice = await Notice.getNoticeById(req.params.id);
        res.json(notice);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Update a notice by ID
const updateNotice = async (req, res) => {
    try {

        const updatedNotice = await Notice.updateNotice(req.params.id, req.body);
        res.json(updatedNotice);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Add a comment to a todo
const addCommentNotice = async (req, res) => {
    try {

        const updatedNotice = await Notice.addComment(req.params.id, req.body);

        res.json(updatedNotice);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Remove a comment from a todo
const removeCommentNotice = async (req, res) => {
    try {

        const updatedNotice = await Notice.removeComment(req.params.id, req.params.commentId, req.user._id);

        res.json(updatedNotice);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Delete a notice by ID
const deleteNotice = async (req, res) => {
    try {

        const deletedNotice = await Notice.deleteNotice(req.params.id);
        res.json(deletedNotice);

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