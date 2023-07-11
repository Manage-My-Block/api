const { app } = require('../app');
const { seedRolesAndAdmin } = require('../utils/seedFunctions')
const { URL, newUserData, newContactData, incompleteContactData, badContactData, updatedContactData } = require('./testData')
const { createUser } = require('./testFunctions')
const request = require('supertest');
const mongoose = require('mongoose')

let JWT = ""
let USER = ""
let CONTACT = ""

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


describe('Contacts Route Tests', () => {
    // Test case: Create a new contact
    it('should create a new contact', async () => {
        const userData = await createUser(newUserData)

        USER = userData.USER
        JWT = userData.JWT

        const response = await request(app)
            .post('/contacts')
            .set('Authorization', 'Bearer ' + JWT)
            .send(newContactData)
            .expect(201);

        CONTACT = response.body

        expect(response.body).toBeDefined();
    });

    // Test case: Get all contacts
    it('should get all contacts', async () => {

        const response = await request(app)
            .get('/contacts')
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body).length > 0 || expect(Array.isArray(response.body)).toBeTruthy();
    });

    // Test case: Update a contact by ID
    it('should update a contact by ID', async () => {

        const response = await request(app)
            .put(`/contacts/${CONTACT._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .send(updatedContactData)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.title).toBe(updatedContactData.title)
    });

    // Test case: Attempt to delete a contact with an invalid ID
    it('should return an error when deleting a contact with an invalid ID', async () => {
        const invalidId = 'invalidId';

        await request(app)
            .delete(`/contacts/${invalidId}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(404);
    });

    // Test case: Attempt to create a contact with incomplete data
    it('should return an error when creating a contact with incomplete data', async () => {

        const response = await request(app)
            .post('/contacts')
            .set('Authorization', 'Bearer ' + JWT)
            .send(incompleteContactData)
            .expect(400);

        expect(response.body.errors).toBeDefined();
        expect(Array.isArray(response.body.errors)).toBeTruthy();
    });

    // Test case: Delete a contact by ID
    it('should delete a contact by ID', async () => {

        const response = await request(app)
            .delete(`/contacts/${CONTACT._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        expect(response.body._id).toBe(CONTACT._id);
    });
});
