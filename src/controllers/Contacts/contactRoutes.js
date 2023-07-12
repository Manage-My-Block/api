const express = require('express');
const router = express.Router();
const { validateNewContact, validateUpdateContact } = require('../../middleware/contactValidation');
const { authenticateUser } = require('../../middleware/authentication')
const { authoriseCommitteeAdmin } = require('../../middleware/authorisation')
const ContactsController = require('./contactController');
const { validateId } = require('../../middleware/validateID')

// Get all contacts
router.get('/contacts', authenticateUser, ContactsController.getContacts);

// Create a new contact
router.post('/contacts', authenticateUser, authoriseCommitteeAdmin, validateNewContact, ContactsController.createContact);

// Update a contact by ID
router.put('/contacts/:id', authenticateUser, authoriseCommitteeAdmin, validateUpdateContact, ContactsController.updateContact);

// Delete a contact by ID
router.delete('/contacts/:id', authenticateUser, authoriseCommitteeAdmin, validateId, ContactsController.deleteContact);

module.exports = router;