const mongoose = require('mongoose')
const Role = require('./models/Role');

// Hardcode role data at server start
const seedRoles = async () => {
    try {
        // Check if roles already exist in the collection
        const existingRoles = await Role.find();
        if (existingRoles.length === 3) {
            return;
        }

        // Create and insert the roles into the collection
        const roles = [
            { role: 'admin' },
            { role: 'committee' },
            { role: 'user' }
        ];

        await Role.insertMany(roles);

        console.log('Roles seeded successfully');

    } catch (error) {
        console.error('Error seeding roles:', error);
    }
};


async function dbConnector(URL) {
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await seedRoles()
}

async function dbDisconnector() {
    await mongoose.connection.close()
}

module.exports = {
    dbConnector, dbDisconnector
}