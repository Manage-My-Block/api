const Role = require('../models/Role')
const User = require('../models/User')
const Todo = require('../models/Todo')
const Notice = require('../models/Notice')
const Building = require('../models/Building')
const mongoose = require('mongoose')

// Seed building, roles and admin
const seedBuilding = async () => {
    try {
        const building = await Building.createBuilding({
            name: "Melbourne Tower Heights",
            address: "111 Big Street, Richmond, Melbourne",
            apartmentCount: 28
        })

        const { adminRole, committeeRole } = await seedRoles()

        // Create admin user
        const adminUser = await User.createUser({
            email: 'admin@admin.com',
            password: '123456',
            apartment: 0,
            name: 'Admin',
            building: building._id,
            role: adminRole._id,
        });

        // Create committee user
        const committeeUser = await User.createUser({
            email: 'committee@committee.com',
            password: '123456',
            apartment: 1,
            building: building._id,
            name: 'Committee',
            role: committeeRole._id,
        });

        // Generate a JWT token
        const adminToken = adminUser.createJWT()
        const committeeToken = committeeUser.createJWT()

        return { adminToken, committeeToken, buildingId: building._id }

    } catch (error) {
        console.log("Error: " + error.message)
    }
};

// Seed just the roles
const seedRoles = async () => {
    // Check if roles were already seeded
    const roles = await Role.find()
    const buildings = await Role.find()

    if (buildings.length < 1) {

        const building = await Building.createBuilding({
            name: "Developer Plaza",
            address: "10 React Avenue, JavaScript Land",
            apartmentCount: 28
        })
    }

    if (roles.length > 0) {

        const adminRole = roles.find(role => role.role === 'admin')
        const committeeRole = roles.find(role => role.role === 'committee')
        const userRole = roles.find(role => role.role === 'user')

        return { adminRole, committeeRole, userRole }
    }

    // Create roles
    const adminRole = await Role.create({ role: 'admin' });
    const committeeRole = await Role.create({ role: 'committee' });
    const userRole = await Role.create({ role: 'user' });

    return { adminRole, committeeRole, userRole }
}

// Seed the database
const seedRolesBuildingUsersTodosNotices = async () => {
    try {
        const { buildingId } = await seedBuilding()
        const roles = await Role.find()

        const committeeRole = roles.find(role => role.role === 'committee')
        const userRole = roles.find(role => role.role === 'user')


        const user1 = await User.createUser({
            email: 'john@email.com',
            password: 'password123',
            apartment: 123,
            name: 'John Doe',
            role: committeeRole._id,
            building: buildingId
        });

        const user2 = await User.createUser({
            email: 'jane@email.com',
            password: 'password456',
            apartment: 456,
            name: 'Jane Smith',
            role: committeeRole._id,
            building: buildingId
        });

        const user3 = await User.createUser({
            email: 'beth@email.com',
            password: 'password789',
            apartment: 789,
            name: 'Beth June',
            role: userRole._id,
            building: buildingId
        });

        // Create example todos
        await Todo.createTodo({
            title: 'Broken front door',
            description: 'The north building front door handle is broken',
            dueDate: new Date('2023-07-15'),
            author: user1._id,
            building: buildingId
        });

        await Todo.createTodo({
            title: 'Cleaning on level 2',
            description: 'The level 2 bin room needs cleaning',
            dueDate: new Date('2023-07-10'),
            author: user2._id,
            building: buildingId
        });

        await Todo.createTodo({
            title: 'Additional CCTV cameras',
            description: 'Can we discuss getting more security cameras',
            dueDate: new Date('2023-07-12'),
            author: user2._id,
            building: buildingId,
            comments: [
                { user: user1._id, comment: "I'm feeling unsafe." },
                { user: user2._id, comment: "Will it cost a lot of money?" },
                { user: user3._id, comment: "I second this proposal." }
            ]
        });

        await Todo.createTodo({
            title: 'External wall cleaning',
            description: 'Application to hire a cleaner to powerwash the exterior walls',
            dueDate: new Date('2023-07-12'),
            author: user2._id,
            building: buildingId,
            vote: [
                { user: user1._id, ballot: true },
                { user: user2._id, ballot: false },
                { user: user3._id, ballot: true }
            ],
        });

        await Notice.createNotice({
            author: user1._id,
            title: 'Block party',
            description: 'Anyone keen on throwing a block party?',
            building: buildingId,
            comments: [
                { user: user1._id, comment: "We can have it at my place." },
                { user: user2._id, comment: "I love it!" },
                { user: user3._id, comment: "I'll bring the beers." }
            ]
        })

    } catch (error) {
        console.log("Error: " + error.message)
    }
};

// Delete documents and wipe database
const deleteAllDocuments = async () => {
    const collections = await mongoose.connection.db.collections()
    for (const collection of collections) {
        await collection.deleteMany({});
    }
};

// Delete documents and wipe database
const dropDatabase = async () => {
    await mongoose.connection.db.dropDatabase()
};

module.exports = { deleteAllDocuments, dropDatabase, seedRoles, seedBuilding, seedRolesBuildingUsersTodosNotices }