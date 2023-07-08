const express = require('express');
const router = express.Router();
const { validateUser } = require('../../middleware/userValidation');
const UserController = require('./userController');

// Get all users
router.get('/users', UserController.getUsers);

// Get user by ID
router.get('/users/:id', UserController.getUserById);

// Create a new user
router.post('/users', validateUser, UserController.createUser);

// Update a user by ID
router.put('/users/:id', validateUser, UserController.updateUser);

// Delete a user by ID
router.delete('/users/:id', validateUser, UserController.deleteUser);

// Other routes...

module.exports = router;