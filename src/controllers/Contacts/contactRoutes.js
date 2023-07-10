const express = require('express');
const router = express.Router();
const { validateNewContact, validateUpdateContact } = require('../../middleware/contactValidation');
const { authenticateUser } = require('../../middleware/authentication')
const { authoriseAdmin, authoriseCommittee, authoriseUser } = require('../../middleware/authorisation')
const ContactsController = require('./contactController');
const { validateId } = require('../../middleware/validateID')

// Get all contacts
router.get('/contacts', authenticateUser, ContactsController.getUsers);

// Create a new contact
router.post('/contacts', authenticateUser, validateNewContact, ContactsController.createUser);

// Update a contact by ID
router.put('/contacts/:id', authenticateUser, validateUpdateContact, ContactsController.updateUser);

// Delete a contact by ID
router.delete('/contacts/:id', authenticateUser, validateId, ContactsController.deleteUser);

module.exports = router;