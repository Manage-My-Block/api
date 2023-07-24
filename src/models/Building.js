const mongoose = require('mongoose')

const buildingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    apartmentCount: {
        type: Number,
        min: [0, 'Must have at least one apartment in building.'],
        required: true
    },
    imageUrl: {
        type: String,
    }
})


// Create a new building
buildingSchema.statics.createBuilding = async function (buildingData) {
    try {
        // Create a new instance of a building record
        const building = new this(buildingData);

        // Save the building record to database
        await building.save();

        return building;

    } catch (error) {

        throw new Error(error.message);

    }
};

buildingSchema.statics.getBuildingById = async function (buildingId) {
    try {
        // Search for building
        const building = await this.findById(buildingId)

        // If building not found throw error
        if (!building) {
            throw new Error('Building not found');
        }

        return building;

    } catch (error) {

        throw new Error(error.message);

    }
}

// Update a building by ID
buildingSchema.statics.updateBuilding = async function (buildingId, buildingData) {
    try {

        // Find the building
        const building = await this.findById(buildingId)

        // if no building found throw error
        if (!building) {
            throw new Error('building not found');
        }

        // Save the updated building
        const updatedBuilding = await this.findByIdAndUpdate(buildingId, buildingData, { new: true })

        return updatedBuilding;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Delete a building by ID
buildingSchema.statics.deleteBuilding = async function (buildingId) {
    try {
        // Find and delete building
        const building = await this.findByIdAndDelete(buildingId);

        // If building not found throw error
        if (!building) {
            throw new Error('building not found');
        }

        // await Budget.deleteMany({ building: building._id })
        // await Contact.deleteMany({ building: building._id })
        // await Notice.deleteMany({ building: building._id })
        // await Todo.deleteMany({ building: building._id })
        // await User.deleteMany({ building: building._id })

        return building;

    } catch (error) {

        throw new Error(error.message);

    }
};

const Building = mongoose.model('Building', buildingSchema)

module.exports = Building