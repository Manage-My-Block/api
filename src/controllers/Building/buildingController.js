const Building = require('../../models/Building')
const User = require('../../models/User')

// Create a building
const createBuilding = async (req, res) => {
    try {

        // Create building using Building static method
        const newBuilding = await Building.createBuilding(req.body.buildingData);

        // Attach new building ID to userData
        req.body.userData.building = newBuilding._id

        // Create an admin for the building
        const newAdmin = await User.createUser(req.body.userData)

        const token = newAdmin.createJWT()

        res.status(201).json({ newBuilding, newAdmin, token });

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get all buildings
const getAllBuildings = async (req, res) => {
    try {
        // Find all buildings
        const buildings = await Building.find()

        res.json(buildings);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get a building by ID
const getBuildingById = async (req, res) => {
    try {
        // Get a single using Building static method
        const building = await Building.getBuildingById(req.params.id);

        res.json(building);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Update a building by ID
const updateBuilding = async (req, res) => {
    try {
        // Updated a building using Building static method
        const updatedBuilding = await Building.updateBuilding(req.params.id, req.body);

        res.json(updatedBuilding);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Delete a building by ID
const deleteBuilding = async (req, res) => {
    try {

        const deletedBuilding = await Building.deleteBuilding(req.params.id);

        res.json(deletedBuilding);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    createBuilding,
    getAllBuildings,
    getBuildingById,
    updateBuilding,
    deleteBuilding,
}