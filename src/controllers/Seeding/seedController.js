const express = require('express')
const SeedRouter = express.Router()
const { deleteAllDocuments, dropDatabase, seedRoles, seedBuilding, seedRolesBuildingUsersTodosNotices } = require('../../utils/seedFunctions')


SeedRouter.get('/wipeseedbuilding', async (req, res) => {
    try {
        // Remove all documents
        await deleteAllDocuments()

        // Seed db with roles, building and one user
        await seedBuilding()

        res.status(200).json({ message: "Database seeded successfully" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

SeedRouter.get('/wipeseedall', async (req, res) => {
    try {
        // Remove all documents
        await deleteAllDocuments()

        // Seed db with roles, building, users, todos and notices
        await seedRolesBuildingUsersTodosNotices()

        res.status(200).json({ message: "Database seeded successfully" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

SeedRouter.get('/wipe', async (req, res) => {
    try {
        // Remove all documents from the 'Role' collection
        await deleteAllDocuments()

        // Seed db with roles
        await seedRoles()

        res.status(200).json({ message: "Database wiped, roles seeded" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

SeedRouter.get('/drop', async (req, res) => {
    try {
        // Drop database
        await dropDatabase()

        // Rebuild database and create roles
        await seedRoles()

        res.status(200).json({ message: "Database dropped and rebuilt, roles and admin seeded" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = { SeedRouter }