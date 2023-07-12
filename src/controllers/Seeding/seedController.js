const express = require('express')
const SeedRouter = express.Router()
const { seedRolesAndAdmin, seedDatabase, deleteAllDocuments, dropDatabase } = require('../../utils/seedFunctions')


SeedRouter.get('/wipeandseed', async (req, res) => {
    try {
        // Remove all documents
        await deleteAllDocuments()

        // Seed db with roles, users, todos and notices
        await seedDatabase()

        res.status(200).json({ message: "Database seeded successfully" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

SeedRouter.get('/wipe', async (req, res) => {
    try {
        // Remove all documents from the 'Role' collection
        await deleteAllDocuments()

        // Seed db with roles and admin
        await seedRolesAndAdmin()

        res.status(200).json({ message: "Database wiped, roles and admin seeded" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

SeedRouter.get('/drop', async (req, res) => {
    try {
        // Remove all documents from the 'Role' collection
        await dropDatabase()

        // Seed db with roles and admin
        // await seedRolesAndAdmin()

        res.status(200).json({ message: "Database dropped and rebuilt, roles and admin seeded" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = { SeedRouter }