const express = require('express');
const router = express.Router();
const { validateNewUser, validateUpdateUser, validateDeleteUser } = require('../../middleware/userValidation');
const { authenticateUser } = require('../../middleware/authentication')
const { authoriseAdmin, authoriseCommittee, authoriseUser } = require('../../middleware/authorisation')
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('./userController');

// Get all users
router.get('/users', authenticateUser, getUsers);

// Get user by ID
router.get('/users/:id', authenticateUser, getUserById);

// Create a new user
router.post('/users', validateNewUser, createUser);

// Update a user by ID
router.put('/users/:id', authenticateUser, validateUpdateUser, updateUser);

// Delete a user by ID
router.delete('/users/:id', authenticateUser, validateDeleteUser, deleteUser);

module.exports = router;