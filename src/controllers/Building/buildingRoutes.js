const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../../middleware/authentication')
const { validateNewBuilding } = require('../../middleware/buildingValidation')
const { validateId } = require('../../middleware/validateID')
const BuildingsController = require('./buildingController');

// Get all buildings
router.get('/buildings', authenticateUser, BuildingsController.getAllBuildings);

// Get building by ID
router.get('/buildings/:id', authenticateUser, validateId, BuildingsController.getBuildingById);

// Create a new building
router.post('/buildings', validateNewBuilding, BuildingsController.createBuilding);

// Update a building by ID
router.put('/buildings/:id', authenticateUser, validateId, BuildingsController.updateBuilding);

// Delete a building by ID
router.delete('/buildings/:id', authenticateUser, validateId, BuildingsController.deleteBuilding);

module.exports = router;