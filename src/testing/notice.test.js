const { app } = require('../app');
const { seedRoles } = require('../controllers/Seeding/seedController')
const { URL, newUserData, newNoticeData, incompleteNoticeData, updatedNoticeData, user2, user3 } = require('./testData')
const { createUser } = require('./testFunctions')
const request = require('supertest');
const mongoose = require('mongoose')

let JWT = ""
let USER = ""
let NOTICE = ""

beforeAll(async () => {
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await seedRoles()
});

afterAll(async () => {
    const collections = await mongoose.connection.db.collections()
    for (const collection of collections) {
        await collection.deleteMany({});
    }
    await mongoose.connection.close();
});


describe('Notices Route Tests', () => {
    // Test case: Create a new notice
    it('should create a new notice', async () => {
        const userData = await createUser(newUserData)

        USER = userData.USER
        JWT = userData.JWT

        newNoticeData.author = USER._id

        const response = await request(app)
            .post('/notices')
            .set('Authorization', 'Bearer ' + JWT)
            .send(newNoticeData)
            .expect(201);

        NOTICE = response.body

        expect(response.body).toBeDefined();
    });

    // Test case: Get all notices
    it('should get all notices', async () => {

        const response = await request(app)
            .get('/notices')
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body).length > 0 || expect(Array.isArray(response.body)).toBeTruthy();
    });

    // Test case: Get a specific notice by ID
    it('should get a specific notice by ID', async () => {

        const response = await request(app)
            .get(`/notices/${NOTICE._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body._id).toBe(NOTICE._id);
    });

    // Test case: Update a notice by ID
    it('should update a notice by ID', async () => {

        const response = await request(app)
            .put(`/notices/${NOTICE._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .send(updatedNoticeData)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.title).toBe(updatedNoticeData.title)
    });

    // Test case: Add comments to a notice
    it('should update a notice with comments', async () => {
        const userData2 = await createUser(user2)
        const userData3 = await createUser(user3)

        const comments = [
            { user: userData2.USER._id, comment: "I love this idea!!" },
            { user: userData3.USER._id, comment: "Sounds great, let's do it this weekend?" }
        ]

        updatedNoticeData.comments = comments

        const response = await request(app)
            .put(`/notices/${NOTICE._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .send(updatedNoticeData)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.comments).length > 0 || expect(Array.isArray(response.body.comments)).toBeTruthy();
        expect(response.body.comments[0].comment).toBe("I love this idea!!")
    });


    // Test case: Attempt to get a notice with an invalid ID
    it('should return an error when getting a notice with an invalid ID', async () => {
        const invalidId = 'invalidId';

        await request(app)
            .get(`/notices/${invalidId}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(404);
    });


    // Test case: Attempt to delete a notice with an invalid ID
    it('should return an error when deleting a notice with an invalid ID', async () => {
        const invalidId = 'invalidId';

        await request(app)
            .delete(`/notices/${invalidId}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(404);
    });

    // Test case: Attempt to create a notice with incomplete data
    it('should return an error when creating a notice with incomplete data', async () => {

        const response = await request(app)
            .post('/notices')
            .set('Authorization', 'Bearer ' + JWT)
            .send(incompleteNoticeData)
            .expect(400);

        expect(response.body.errors).toBeDefined();
        expect(Array.isArray(response.body.errors)).toBeTruthy();
    });

    // Test case: Delete a notice by ID
    it('should delete a notice by ID', async () => {

        const response = await request(app)
            .delete(`/notices/${NOTICE._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        expect(response.body._id).toBe(NOTICE._id);
    });
});
