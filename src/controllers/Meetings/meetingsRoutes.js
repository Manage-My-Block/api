const express = require('express');
const router = express.Router();
const { validateId } = require('../../middleware/validateID')
const { authenticateUser } = require('../../middleware/authentication')
const MeetingsController = require('./meetingsController');

// Get all meetings
router.get('/meetings', authenticateUser, MeetingsController.getAllMeetings);

// Get all meetings by building Id
router.get('/meetings/building/:id', authenticateUser, MeetingsController.getAllMeetingsByBuilding);

// Get meeting by ID
router.get('/meetings/:id', authenticateUser, validateId, MeetingsController.getMeetingById);

// Create a new meeting
router.post('/meetings', authenticateUser, MeetingsController.createMeeting);

// Update a meeting by ID
router.put('/meetings/:id', authenticateUser, validateId, MeetingsController.updateMeeting);

// Delete a meeting by ID
router.delete('/meetings/:id', authenticateUser, validateId, MeetingsController.deleteMeeting);

module.exports = router;