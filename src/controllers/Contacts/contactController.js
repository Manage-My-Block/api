const Contact = require('../../models/Contact');

// Get all contacts
const getContacts = async (req, res) => {
    try {
        // Get all Contacts
        const contacts = await Contact.find();

        // Return list of Contacts
        res.status(200).json(contacts);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Update a contact by ID
const updateContact = async (req, res) => {
    try {
        // Update contact
        const updatedContact = await Contact.updateContact(req.params.id, req.body);

        // Return updated Contact
        res.json(updatedContact);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
    try {
        // Delete Contact
        const deletedContact = await Contact.deleteContact(req.params.id);

        // Return deleted contact
        res.json(deletedContact);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getContacts,
    updateContact,
    deleteContact
}