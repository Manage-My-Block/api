const express = require('express');
const router = express.Router();
const { validateNewUser, validateUpdateUser, validateDeleteUser } = require('../../middleware/userValidation');
const { authenticateUser } = require('../../middleware/authentication')
const { authoriseAdmin, authoriseCommittee, authoriseUser } = require('../../middleware/authorisation')
const UsersController = require('./userController');

// Get all users
router.get('/users', authenticateUser, UsersController.getUsers);

// Get user by ID
router.get('/users/:id', authenticateUser, UsersController.getUserById);

// Create a new user
router.post('/users', validateNewUser, UsersController.createUser);

// Update a user by ID
router.put('/users/:id', authenticateUser, validateUpdateUser, UsersController.updateUser);

// Delete a user by ID
router.delete('/users/:id', authenticateUser, validateDeleteUser, UsersController.deleteUser);

module.exports = router;