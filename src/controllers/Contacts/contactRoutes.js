const express = require('express');
const router = express.Router();
const { validateNewContact, validateUpdateContact } = require('../../middleware/contactValidation');
const { authenticateUser } = require('../../middleware/authentication')
const { authoriseCommitteeAdmin } = require('../../middleware/authorisation')
const ContactsController = require('./contactController');
const { validateId } = require('../../middleware/validateID')

// Get all contacts
router.get('/contacts', authenticateUser, ContactsController.getContacts);

// Get all contacts by buildingId
router.get('/contacts/building/:id', authenticateUser, ContactsController.getContactsByBuilding);

// Create a new contact
router.post('/contacts', authenticateUser, validateNewContact, ContactsController.createContact);

// Update a contact by ID
router.put('/contacts/:id', authenticateUser, validateUpdateContact, ContactsController.updateContact);

// Delete a contact by ID
router.delete('/contacts/:id', authenticateUser, validateId, ContactsController.deleteContact);

module.exports = router;