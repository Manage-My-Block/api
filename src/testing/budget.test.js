const { app } = require('../app');
const { seedRolesAndAdmin, seedRoles } = require('../utils/seedFunctions')
const { URL, newUserData, newBudgetData, updatedBudgetData, badBudgetData, incompleteBudgetData } = require('./testData')
const { createUser, createBuilding } = require('./testFunctions')
const request = require('supertest');
const mongoose = require('mongoose')

let JWT
let USER
let BUDGET
let BUILDING
const validIdNoRecord = '64abe47f0085854062708833';

beforeAll(async () => {
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
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


describe('Budget Route Tests', () => {
    // Test case: Create a new budget
    it('should create a new budget', async () => {
        newUserData.building = BUILDING._id

        const userData = await createUser(newUserData)

        USER = userData.USER
        JWT = userData.JWT

        newBudgetData.building = BUILDING._id

        const response = await request(app)
            .post('/budgets')
            .set('Authorization', 'Bearer ' + JWT)
            .send(newBudgetData)
            .expect(201);

        // console.log(response)

        BUDGET = response.body

        expect(response.body).toBeDefined();
        expect(response.body._id).toBeDefined();
    });

    // Test case: Get all budgets
    it('should get all budgets', async () => {

        const response = await request(app)
            .get('/budgets')
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        // console.log(response.body)

        expect(response.body).toBeDefined();
        expect(response.body).length > 0 || expect(Array.isArray(response.body)).toBeTruthy();
    });

    // Test case: Get a specific budget by ID
    it('should get a specific budget by ID', async () => {

        const response = await request(app)
            .get(`/budgets/${BUDGET._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        // console.log(response.body, BUDGET._id)
        // console.log(response.body)

        expect(response.body).toBeDefined();
        expect(response.body._id).toBe(BUDGET._id);
    });

    // Test case: Get a specific budget by Building ID
    it('should get a specific budget by Building ID', async () => {

        const response = await request(app)
            .get(`/budgets/building/${BUILDING._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body._id).toBe(BUDGET._id);
    });

    // Test case: Update a budget by ID
    it('should update a budget by ID', async () => {

        const response = await request(app)
            .put(`/budgets/${BUDGET._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .send(updatedBudgetData)
            .expect(200);

        // console.log(response.body)

        expect(response.body).toBeDefined();
        expect(response.body.title).toBe(updatedBudgetData.title)
    });

    // Test case: Add a transaction to a budget
    it('should add a transaction to a budget', async () => {

        const transaction = { amount: 500000, description: "Exterior painting" }

        const response = await request(app)
            .put(`/budgets/${BUDGET._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .send({ transaction })
            .expect(200);

        // console.log(response.body)

        expect(response.body).toBeDefined()
        expect(response.body.transactions.length).toBe(1)
        expect(response.body.balance).toBe(500000)

    });

    // Test case: Attempt to get a budget with an invalid ID
    it('should return an error when getting a budget with an invalid ID', async () => {
        const invalidId = 'invalidId';

        await request(app)
            .get(`/budgets/${invalidId}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(400);
    });

    // Test case: Attempt to delete a budget with an invalid ID
    it('should return an error when deleting a budget with an invalid ID', async () => {
        const invalidId = 'invalidId';

        await request(app)
            .delete(`/budgets/${invalidId}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(400);
    });

    // Test case: Attempt to create a budget with incomplete data
    it('should return an error when creating a budget with incomplete data', async () => {

        const response = await request(app)
            .post('/budgets')
            .set('Authorization', 'Bearer ' + JWT)
            .send(incompleteBudgetData)
            .expect(400);

        expect(response.body.errors).toBeDefined();
        expect(Array.isArray(response.body.errors)).toBeTruthy();
    });

    // Test case: Attempt to get a budget that doesn't exist
    it('should return an error when getting a budget that doesn\'t exist', async () => {

        const response = await request(app)
            .get(`/budgets/${validIdNoRecord}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(404);

        // console.log(response.body)
    });

    // Test case: Attempt to delete a budget that doesn't exist
    it('should return an error when deleting a budget that doesn\'t exist', async () => {

        await request(app)
            .delete(`/budgets/${validIdNoRecord}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(404);
    });

    // Test case: Delete a budget by ID
    it('should delete a budget by ID', async () => {

        const response = await request(app)
            .delete(`/budgets/${BUDGET._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        expect(response.body._id).toBe(BUDGET._id);
    });
});
