const mongoose = require('mongoose')

const meetingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    meetingDate: {
        type: Date,
        required: true
    },
    zoomLink: {
        type: String,
        required: true
    },
    building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        required: true,
        autopopulate: { select: 'name' }
    },
})



// Create a new meeting
meetingSchema.statics.createMeeting = async function (meetingData) {
    try {
        // Create new Meeting
        const meeting = new this(meetingData);

        // Save meeting to db
        await meeting.save();

        return meeting;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Read a meeting by ID
meetingSchema.statics.getMeetingById = async function (meetingId) {
    try {
        // Search for meeting
        const meeting = await this.findById(meetingId)

        // If meeting not found throw error
        if (!meeting) {
            throw new Error('meeting not found');
        }

        return meeting;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Update a meeting by ID
meetingSchema.statics.updateMeeting = async function (meetingId, updateData) {
    try {
        // Search for meeting and update
        const meeting = await this.findByIdAndUpdate(meetingId, updateData, { new: true });

        // If meeting not found throw error
        if (!meeting) {
            throw new Error('Meeting not found');
        }

        return meeting;

    } catch (error) {

        throw new Error(error.message);

    }
};



// Delete a meeting by ID
meetingSchema.statics.deleteMeeting = async function (meetingId) {
    try {

        // Delete meeting
        const meeting = await this.findByIdAndDelete(meetingId);

        // If meeting not found throw error
        if (!meeting) {
            throw new Error('Meeting not found');
        }

        return meeting;

    } catch (error) {
        throw new Error(error.message);

    }
};




const Meeting = mongoose.model('meeting', meetingSchema)

module.exports = Meeting