const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Role = require('../../models/Role')
const User = require('../../models/User')


// Seed the database
const seedDatabase = async () => {
    try {
        // Create roles
        const adminRole = await Role.create({ role: 'Admin' });
        const committeeRole = await Role.create({ role: 'Committee' });
        const userRole = await Role.create({ role: 'User' });

        // Create users with different roles
        const users = [
            { username: 'admin1', password: 'admin1pass', apartment: 1, name: 'Admin User 1', role: adminRole._id },
            { username: 'committee1', password: 'committee1pass', apartment: 2, name: 'Committee User 1', role: committeeRole._id },
            { username: 'user1', password: 'user1pass', apartment: 3, name: 'Regular User 1', role: userRole._id }
        ];


        await User.create(users);
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

const deleteAllDocuments = async () => {
    try {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            await collections[key].deleteMany({});
        }
        console.log('All documents deleted successfully');
    } catch (error) {
        console.error('Error deleting documents:', error);
    }
};


router.get('/seed', async (req, res) => {
    try {
        await deleteAllDocuments(); // Remove all documents from the 'Role' collection
        // Add additional deleteMany statements for other collections if needed
        await seedDatabase()
        console.log("Database seeded")
        res.status(200).json({ message: "Database seeded successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }


})

module.exports = router