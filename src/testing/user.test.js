const { app } = require('../app');
const { seedRolesAndAdmin, seedRoles } = require('../utils/seedFunctions')
const { URL, newUserData, incompleteUserData, updatedUserData } = require('./testData')
const { createBuilding } = require('./testFunctions')
const request = require('supertest');
const mongoose = require('mongoose')

let JWT
let USER
let BUILDING

beforeAll(async () => {
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // await seedRolesAndAdmin()

    await seedRoles()
    const newBuildingData = await createBuilding()
    BUILDING = newBuildingData.BUILDING
});

afterAll(async () => {
    const collections = await mongoose.connection.db.collections()
    for (const collection of collections) {
        await collection.deleteMany({});
    }
    await mongoose.connection.close();
});


describe('User Routes Tests', () => {
    // Test case: Create a new user
    it('should create a new user', async () => {
        newUserData.building = BUILDING._id

        const response = await request(app)
            .post('/register')
            .send(newUserData)
            .expect(201);

        expect(response.body.user).toBeDefined();
        expect(response.body.token).toBeDefined();

        USER = response.body.user
        JWT = response.body.token
    });

    // Test case: Get all users
    it('should get all users', async () => {
        const response = await request(app)
            .get('/users')
            .set("Authorization", `Bearer ${JWT}`)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    // Test case: Get a specific user by ID
    it('should get a specific user by ID', async () => {
        const response = await request(app)
            .get(`/users/${USER._id}`)
            .set("Authorization", `Bearer ${JWT}`)
            .expect(200);


        expect(response.body._id).toBe(USER._id);
    });

    // Test case: Update a user by ID
    it('should update a user by ID', async () => {
        const response = await request(app)
            .put(`/users/${USER._id}`)
            .set("Authorization", `Bearer ${JWT}`)
            .send(updatedUserData)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.email).toBe("new@email.com");
    });

    // Test case: Attempt to get a user with an invalid ID
    it('should return an error when getting a user with an invalid ID', async () => {
        const invalidId = 'invalidId';

        const response = await request(app)
            .get(`/users/${invalidId}`)
            .set("Authorization", `Bearer ${JWT}`)
            .expect(404);
    });

    // Test case: Attempt to update a user with an invalid ID
    it('should return an error when updating a user with an invalid ID', async () => {
        const invalidId = 'invalidId';

        const response = await request(app)
            .put(`/users/${invalidId}`)
            .set("Authorization", `Bearer ${JWT}`)
            .send(updatedUserData)
            .expect(401);

    });

    // Test case: Attempt to delete a user with an invalid ID
    it('should return an error when deleting a user with an invalid ID', async () => {
        const invalidId = 'invalidId';

        const response = await request(app)
            .delete(`/users/${invalidId}`)
            .set("Authorization", `Bearer ${JWT}`)
            .expect(401);

    });

    // Test case: Attempt to create a user with incomplete data
    it('should return an error when creating a user with incomplete data', async () => {
        const response = await request(app)
            .post('/register')
            .send(incompleteUserData)
            .expect(400);

        expect(response.body.errors).toBeDefined();
    });

    // Test case: Delete a user by ID
    it('should delete a user by ID', async () => {

        const response = await request(app)
            .delete(`/users/${USER._id}`)
            .set("Authorization", `Bearer ${JWT}`)
            .expect(200);

        expect(response.body._id).toBe(USER._id);
    });

});