const Role = require('../models/Role')
const User = require('../models/User')
const Todo = require('../models/Todo')
const Notice = require('../models/Notice')
const jwt = require('jsonwebtoken');
const { encrypt } = require('../utils/encryption')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Configure environment
dotenv.config()

// Seed roles and admin
const seedRolesAndAdmin = async () => {
    try {
        // Check if roles were already seeded
        const roles = await Role.find()

        // Check if admin was already created
        const foundAdmin = (await User.find()).find(user => user.role.role === 'admin')

        if (roles.length > 0 || foundAdmin) {
            const token = jwt.sign({ payload: encrypt(foundAdmin._id) }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

            console.log(token)

            return
        }

        // Create roles
        const adminRole = await Role.create({ role: 'admin' });
        await Role.create({ role: 'committee' });
        await Role.create({ role: 'user' });

        // Create admin user
        const adminUser = await User.createUser({
            username: 'admin@admin.com',
            password: '1234',
            apartment: 0,
            name: 'Admin',
            role: adminRole._id,
        });

        // Generate a JWT token
        const token = jwt.sign({ payload: encrypt(adminUser._id) }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

        // Print token
        console.log(token)

    } catch (error) {
        console.log("Error: " + error.message)
    }
};

// Seed the database
const seedDatabase = async () => {
    try {
        await seedRolesAndAdmin()
        const roles = await Role.find()

        const committeeRole = roles.find(role => role.role === 'committee')
        const userRole = roles.find(role => role.role === 'user')


        const user1 = await User.createUser({
            username: 'john@email.com',
            password: 'password123',
            apartment: 123,
            name: 'John Doe',
            role: committeeRole._id,
        });

        const user2 = await User.createUser({
            username: 'jane@email.com',
            password: 'password456',
            apartment: 456,
            name: 'Jane Smith',
            role: committeeRole._id,
        });

        const user3 = await User.createUser({
            username: 'beth@email.com',
            password: 'password789',
            apartment: 789,
            name: 'Beth June',
            role: userRole._id,
        });

        // Create example todos
        await Todo.createTodo({
            title: 'Broken front door',
            description: 'The north building front door handle is broken',
            dueDate: new Date('2023-07-15'),
            author: user1._id,
        });

        await Todo.createTodo({
            title: 'Cleaning on level 2',
            description: 'The level 2 bin room needs cleaning',
            dueDate: new Date('2023-07-10'),
            author: user2._id,
        });

        await Todo.createTodo({
            title: 'Additional CCTV cameras',
            description: 'Can we discuss getting more security cameras',
            dueDate: new Date('2023-07-12'),
            author: user2._id,
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

module.exports = { seedRolesAndAdmin, seedDatabase, deleteAllDocuments }