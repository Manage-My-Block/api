const express = require('express');
const router = express.Router();
const { validateCreateNotice, validateUpdateNotice } = require('../../middleware/noticeValidation')
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

// Delete a notice by ID
router.delete('/notices/:id', authenticateUser, NoticesController.deleteNotice);

module.exports = router;