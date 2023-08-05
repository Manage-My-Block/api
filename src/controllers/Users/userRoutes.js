const express = require('express');
const router = express.Router();
const { validateUpdateUser } = require('../../middleware/userValidation');
const { validateId } = require('../../middleware/validateID')
const { authenticateUser } = require('../../middleware/authentication')
const { authoriseAdminUsers, authoriseOwner } = require('../../middleware/authorisation')
const UsersController = require('./userController');

// Get all users
router.get('/users', authenticateUser, UsersController.getUsers);

// Get user by ID
router.get('/users/:id', authenticateUser, UsersController.getUserById);

// Get user by building ID
router.get('/users/building/:id', authenticateUser, UsersController.getUserByBuilding);

// Update a user by ID
router.put('/users/:id', authenticateUser, authoriseOwner, validateUpdateUser, UsersController.updateUser);

// Delete a user by ID
router.delete('/users/:id', authenticateUser, authoriseOwner, validateId, UsersController.deleteUser);

module.exports = router;