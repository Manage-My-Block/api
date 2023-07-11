const { app } = require('../app');
const { seedRolesAndAdmin } = require('../utils/seedFunctions')
const { URL, newUserData, newNoticeData, incompleteNoticeData, updatedNoticeData, user2, user3 } = require('./testData')
const { createUser } = require('./testFunctions')
const request = require('supertest');
const mongoose = require('mongoose')

let JWT = ""
let USER = ""
let NOTICE = ""
const validId = '64abe47f0085854062708833';

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

    // Test case: Add a comment to a notice
    it('should add a comment to a notice', async () => {

        const comment1 = { user: USER._id, comment: "Comment 1" }
        const comment2 = { user: USER._id, comment: "Comment 2" }

        const response1 = await request(app)
            .put(`/notices/${NOTICE._id}/comment`)
            .set('Authorization', 'Bearer ' + JWT)
            .send(comment1)
            .expect(200);

        expect(response1.body).toBeDefined();
        expect(response1.body.comments).length > 0 || expect(Array.isArray(response1.body.comments)).toBeTruthy();
        expect(response1.body.comments[response1.body.comments.length - 1].comment).toBe("Comment 1")

        const response2 = await request(app)
            .put(`/notices/${NOTICE._id}/comment`)
            .set('Authorization', 'Bearer ' + JWT)
            .send(comment2)
            .expect(200);

        expect(response2.body).toBeDefined();
        expect(response2.body.comments).length > 0 || expect(Array.isArray(response2.body.comments)).toBeTruthy();
        expect(response2.body.comments[response2.body.comments.length - 1].comment).toBe("Comment 2")

        COMMENTS = response2.body.comments
    });

    // Test case: Delete a comment from a notice
    it('should delete a comment from a notice', async () => {
        const response = await request(app)
            .get(`/notices/${NOTICE._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body._id).toBe(NOTICE._id);

        const response1 = await request(app)
            .put(`/notices/${NOTICE._id}/comment/${response.body.comments[0]._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        expect(response1.body).toBeDefined();
        expect(response1.body.comments).length === 1;
        expect(response1.body.comments[0].comment).toBe("Comment 2")
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

    // Test case: Attempt to get a notice that doesn't exist
    it('should return an error when getting a notice that doesn\'t exist', async () => {

        await request(app)
            .get(`/notices/${validId}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(404);
    });

    // Test case: Attempt to delete a notice that doesn't exist
    it('should return an error when deleting a notice that doesn\'t exist', async () => {

        await request(app)
            .delete(`/notices/${validId}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(404);
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
