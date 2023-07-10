const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAd: {
        type: Date,
        default: Date.now
    }
})

// Create a new contact
contactSchema.statics.createContact = async function (contactData) {
    try {
        // Create a new instance of a contact record
        const contact = new this(contactData);

        // Save the record
        await contact.save();

        return contact;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Update a contact by ID
contactSchema.statics.updateContact = async function (contactId, contactData) {
    try {

        // Find the contact
        const contact = await this.findById(contactId)

        // if no contact found throw error
        if (!contact) {
            throw new Error('contact not found');
        }

        // Save the updated contact
        const updatedContact = await this.findByIdAndUpdate(contactId, contactData, { new: true })

        return updatedContact;

    } catch (error) {

        throw new Error(error.message);

    }
};

// Delete a contact by ID
contactSchema.statics.deleteContact = async function (contactId) {
    try {

        const contact = await this.findByIdAndDelete(contactId);

        if (!contact) {
            throw new Error('contact not found');
        }

        return contact;

    } catch (error) {

        throw new Error(error.message);

    }
};

const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact