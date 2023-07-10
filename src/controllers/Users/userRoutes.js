const express = require('express');
const router = express.Router();
const { validateUpdateUser } = require('../../middleware/userValidation');
const { validateId } = require('../../middleware/validateID')
const { authenticateUser } = require('../../middleware/authentication')
const { authoriseAdmin, authoriseCommittee, authoriseUser } = require('../../middleware/authorisation')
const UsersController = require('./userController');

// Get all users
router.get('/users', authenticateUser, UsersController.getUsers);

// Get user by ID
router.get('/users/:id', authenticateUser, UsersController.getUserById);

// Update a user by ID
router.put('/users/:id', authenticateUser, validateUpdateUser, UsersController.updateUser);

// Delete a user by ID
router.delete('/users/:id', authenticateUser, validateId, UsersController.deleteUser);

module.exports = router;