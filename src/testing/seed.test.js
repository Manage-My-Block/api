const { app } = require('../app');
const { URL } = require('./testData')
const request = require('supertest');
const mongoose = require('mongoose')

beforeAll(async () => {
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
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
    it('should drop database and seed roles', async () => {

        const response = await request(app)
            .get('/drop')
            .expect(200);
    });

    // Test case: Wipe and seed database
    it('should wipe and seed roles/building in database', async () => {

        const response = await request(app)
            .get('/wipeseedbuilding')
            .expect(200);
    });

    // Test case: Wipe and seed database
    it('should wipe and reseed roles', async () => {

        const response = await request(app)
            .get('/wipe')
            .expect(200);
    });

    // Test case: Wipe and seed database
    it('should wipe and seed all items', async () => {

        const response = await request(app)
            .get('/wipeseedall')
            .expect(200);
    });

});
