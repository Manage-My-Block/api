const express = require('express');
const router = express.Router();
const { validateCreateNotice, validateUpdateNotice } = require('../../middleware/noticeValidation')
const { validateComment } = require('../../middleware/commentValidation')
const { authenticateUser } = require('../../middleware/authentication')
const NoticesController = require('./noticesController');

// Get all notices
router.get('/notices', authenticateUser, NoticesController.getAllNotices);

// Get notice by ID
router.get('/notices/:id', authenticateUser, NoticesController.getNoticeById);

// Create a new notice
router.post('/notices', authenticateUser, validateCreateNotice, NoticesController.createNotice);

// Update a notice by ID
router.put('/notices/:id', authenticateUser, validateUpdateNotice, NoticesController.updateNotice);

// Add a comment to a notice
router.patch('/notices/:id/', authenticateUser, validateComment, NoticesController.addCommentNotice);

// Remove a comment from a notice
router.delete('/notices/:id/:commentId', authenticateUser, validateComment, NoticesController.removeCommentNotice);

// Delete a notice by ID
router.delete('/notices/:id', authenticateUser, NoticesController.deleteNotice);

module.exports = router;