const { app } = require('../app');
const { seedRolesAndAdmin } = require('../utils/seedFunctions')
const { URL } = require('./testData')
const request = require('supertest');
const mongoose = require('mongoose')


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


describe('Roles Routes Tests', () => {
    // Test case: Get all roles
    it('should get all roles', async () => {
        const response = await request(app)
            .get('/roles')
            .expect(200);

        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBeTruthy();
    });
});