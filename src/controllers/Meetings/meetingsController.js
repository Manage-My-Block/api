const Meeting = require('../../models/Meeting')

// Create a meeting
const createMeeting = async (req, res) => {
    try {
        // Create a meeting
        const meeting = await Meeting.createMeeting(req.body);

        // Return new meeting data
        res.status(201).json(meeting);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get all meetings
const getAllMeetings = async (req, res) => {
    try {
        // Search for all meetings
        const meetings = await Meeting.find();

        // Return meeting list
        res.json(meetings);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get all meetings
const getAllMeetingsByBuilding = async (req, res) => {
    try {
        // Search for all meetings
        const meetings = await Meeting.find({ building: req.params.id });

        // Return meeting list
        res.json(meetings);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get a meeting by ID
const getMeetingById = async (req, res) => {
    try {
        // Search for meeting
        const meeting = await Meeting.getMeetingById(req.params.id);

        // Return meeting
        res.json(meeting);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Update a meeting by ID
const updateMeeting = async (req, res) => {
    try {
        // Search for meeting
        const foundMeeting = await Meeting.findById(req.params.id)

        // If meeting not found throw error
        if (!foundMeeting) {
            throw new Error('Meeting not found');
        }

        // Only admin or committee or meeting owner can update a meeting
        if ((req.user.role.role !== 'admin' || req.user.role.role !== 'committee') && req.user._id.toString() !== foundMeeting.author._id.toString()) {
            throw new Error('Unauthorized');
        }

        // Make meeting update
        const meeting = await Meeting.updateMeeting(req.params.id, req.body);

        res.json(meeting);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};


// Delete a meeting by ID
const deleteMeeting = async (req, res) => {

    try {

        // Search for meeting
        const foundMeeting = await Meeting.findById(req.params.id)


        // If meeting not found throw error
        if (!foundMeeting) {
            throw new Error('Meeting not found');
        }

        // Only admin or committee member can delete a meeting
        if ((req.user.role.role !== 'admin' && req.user.role.role !== 'committee')) {
            throw new Error('Unauthorized');
        }

        // Delete meeting
        const meeting = await Meeting.deleteMeeting(req.params.id);
        // console.log(meeting)

        // Return deleted meeting
        res.json(meeting);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    createMeeting,
    getAllMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting,
    getAllMeetingsByBuilding
}