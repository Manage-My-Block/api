const express = require('express')
const SeedRouter = express.Router()
const { seedRolesAndAdmin, seedDatabase, deleteAllDocuments, dropDatabase } = require('../../utils/seedFunctions')


SeedRouter.get('/wipeandseed', async (req, res) => {
    try {
        // Remove all documents
        await deleteAllDocuments()

        console.log('All documents deleted successfully')

        // Seed db with roles, users, todos and notices
        await seedDatabase()

        console.log("Database seeded")

        res.status(200).json({ message: "Database seeded successfully" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

SeedRouter.get('/wipe', async (req, res) => {
    try {
        // Remove all documents from the 'Role' collection
        await deleteAllDocuments()

        console.log('All documents deleted successfully')

        // Seed db with roles and admin
        await seedRolesAndAdmin()

        console.log("Database roles and admin seeded")

        res.status(200).json({ message: "Database wiped" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

SeedRouter.get('/drop', async (req, res) => {
    try {
        // Remove all documents from the 'Role' collection
        await dropDatabase()

        console.log('Database dropped successfully')

        // Seed db with roles and admin
        await seedRolesAndAdmin()

        console.log("Database roles and admin seeded")

        res.status(200).json({ message: "Database dropped" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = { SeedRouter }