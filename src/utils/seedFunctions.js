const { dbConnector, dbDisconnector } = require('../database')
const Role = require('../models/Role')
const User = require('../models/User')
const Todo = require('../models/Todo')

// Seed the database
const seedDatabase = async () => {

    // Create roles
    const adminRole = await Role.create({ role: 'admin' });
    const committeeRole = await Role.create({ role: 'committee' });
    const userRole = await Role.create({ role: 'user' });

    // Create example users
    const user1 = await User.createUser({
        username: 'john@email.com',
        password: 'password123',
        apartment: 123,
        name: 'John Doe',
        role: adminRole._id,
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
            { user: user1._id, comment: "Comment 1" },
            { user: user2._id, comment: "Comment 2" },
            { user: user3._id, comment: "Comment 3" }
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
};

// Seed the database
const seedRoles = async () => {
    // Check if roles were already seeded
    const roles = await Role.find()

    if (roles.length > 0) {
        return
    }

    // Create roles
    await Role.create({ role: 'admin' });
    await Role.create({ role: 'committee' });
    await Role.create({ role: 'user' });

};

const seedUsers = async () => {
    // Find roles
    const roles = await Role.find()

    // Create example users
    await User.createUser({
        username: 'john@email.com',
        password: 'password123',
        apartment: 123,
        name: 'John Doe',
        role: roles[0]._id,
    });

    await User.createUser({
        username: 'jane@email.com',
        password: 'password456',
        apartment: 456,
        name: 'Jane Smith',
        role: roles[1]._id,
    });

    await User.createUser({
        username: 'beth@email.com',
        password: 'password789',
        apartment: 789,
        name: 'Beth June',
        role: roles[2]._id,
    });
};

module.exports = { seedDatabase, seedRoles, seedUsers }