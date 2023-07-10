const express = require('express');
const router = express.Router();
const { validateNewContact, validateUpdateContact } = require('../../middleware/contactValidation');
const { authenticateUser } = require('../../middleware/authentication')
const { authoriseAdmin, authoriseCommittee, authoriseUser } = require('../../middleware/authorisation')
const ContactsController = require('./contactController');
const { validateId } = require('../../middleware/validateID')

// Get all contacts
router.get('/contacts', authenticateUser, UsersController.getUsers);

// Get contact by ID
router.get('/contacts/:id', authenticateUser, validateId, UsersController.getUserById);

// Create a new contact
router.post('/contacts', authenticateUser, validateNewContact, UsersController.createUser);

// Update a contact by ID
router.put('/contacts/:id', authenticateUser, validateUpdateContact, UsersController.updateUser);

// Delete a contact by ID
router.delete('/contacts/:id', authenticateUser, validateId, UsersController.deleteUser);

module.exports = router;