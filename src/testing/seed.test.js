const { app } = require('../app');
const { seedRolesAndAdmin } = require('../utils/seedFunctions')
const { URL, newTodoData, badTodoData, incompleteTodoData, updatedTodoData } = require('./testData')
const { loginAdmin } = require('./testFunctions')
const request = require('supertest');
const mongoose = require('mongoose')

let JWT = ""
let USER = ""
let TODO = ""
let COMMENTS = []

beforeAll(async () => {
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await seedRolesAndAdmin()
});

afterAll(async () => {
    const collections = await mongoose.connection.db.collections()
    for (const collection of collections) {
        await collection.deleteMany({});
    }
    await mongoose.connection.close();
});


describe('Todos Route Tests', () => {
    // Test case: Drop database
    it('should drop database', async () => {

        const response = await request(app)
            .get('/drop')
            .expect(200);
    });

    // Test case: Wipe and seed database
    it('should wipe and seed database', async () => {

        const response = await request(app)
            .get('/wipeandseed')
            .expect(200);
    });

    // Test case: Wipe and seed database
    it('should wipe database', async () => {

        const response = await request(app)
            .get('/wipe')
            .expect(200);
    });

});
