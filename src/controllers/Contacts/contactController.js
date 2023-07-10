const Contact = require('../../models/Contact');

// Get all users
const getContacts = async (req, res) => {
    try {
        // Get all Contacts
        const users = await Contact.find();

        // Return list of Contacts
        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

// Get a specific user by ID
const getContactById = async (req, res) => {
    try {
        // Get a Contact by ID
        const user = await Contact.getContactById(req.params.id);

        // Return Contact
        res.json(user);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Update a user by ID
const updateContact = async (req, res) => {
    try {
        // Update user
        const updatedContact = await Contact.updateContact(req.params.id, req.body);

        // Return updated Contact
        res.json(updatedContact);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

// Delete a user by ID
const deleteContact = async (req, res) => {
    try {
        // Delete Contact
        const deletedContact = await Contact.deleteContact(req.params.id);

        // Return deleted user
        res.json(deletedContact);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getContacts,
    getContactById,
    updateContact,
    deleteContact
}