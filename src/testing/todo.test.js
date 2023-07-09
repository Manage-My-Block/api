const { app } = require('../app');
const { seedRoles } = require('../controllers/Seeding/seedController')
const { URL, newUserData, newTodoData, incompleteTodoData, updatedTodoData, user2, user3 } = require('./testData')
const { createUser } = require('./testFunctions')
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
    await seedRoles()
});

afterAll(async () => {
    const collections = await mongoose.connection.db.collections()
    for (const collection of collections) {
        await collection.deleteMany({});
    }
    await mongoose.connection.close();
});


describe('Todos Route Tests', () => {
    // Test case: Create a new todo
    it('should create a new todo', async () => {
        const userData = await createUser(newUserData)

        USER = userData.USER
        JWT = userData.JWT

        newTodoData.author = USER._id

        const response = await request(app)
            .post('/todos')
            .set('Authorization', 'Bearer ' + JWT)
            .send(newTodoData)
            .expect(201);

        TODO = response.body

        expect(response.body).toBeDefined();
    });

    // Test case: Get all todos
    it('should get all todos', async () => {

        const response = await request(app)
            .get('/todos')
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body).length > 0 || expect(Array.isArray(response.body)).toBeTruthy();
    });

    // Test case: Get a specific todo by ID
    it('should get a specific todo by ID', async () => {

        const response = await request(app)
            .get(`/todos/${TODO._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body._id).toBe(TODO._id);
    });

    // Test case: Update a todo by ID
    it('should update a todo by ID', async () => {

        const response = await request(app)
            .put(`/todos/${TODO._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .send(updatedTodoData)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.title).toBe(updatedTodoData.title)
    });

    // Test case: Add a comment to a todo
    it('should update a todo by ID', async () => {

        const comment1 = { user: USER._id, comment: "Comment 1" }
        const comment2 = { user: USER._id, comment: "Comment 2" }

        const response1 = await request(app)
            .patch(`/todos/${TODO._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .send(comment1)
            .expect(200);

        expect(response1.body).toBeDefined();
        expect(response1.body.comments).length > 0 || expect(Array.isArray(response1.body.comments)).toBeTruthy();
        expect(response1.body.comments[response1.body.comments.length - 1].comment).toBe("Comment 1")

        const response2 = await request(app)
            .patch(`/todos/${TODO._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .send(comment2)
            .expect(200);

        expect(response2.body).toBeDefined();
        expect(response2.body.comments).length > 0 || expect(Array.isArray(response2.body.comments)).toBeTruthy();
        expect(response2.body.comments[response2.body.comments.length - 1].comment).toBe("Comment 2")

        COMMENTS = response2.body.comments
    });

    // Test case: Delete a comment from a todo
    it('should update a todo by ID', async () => {
        const response = await request(app)
            .get(`/todos/${TODO._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body._id).toBe(TODO._id);

        const response1 = await request(app)
            .delete(`/todos/${TODO._id}/${response.body.comments[0]._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        expect(response1.body).toBeDefined();
        expect(response1.body.comments).length === 1;
        expect(response1.body.comments[0].comment).toBe("Comment 2")

    });

    // Test case: Attempt to get a todo with an invalid ID
    it('should return an error when getting a todo with an invalid ID', async () => {
        const invalidId = 'invalidId';

        await request(app)
            .get(`/todos/${invalidId}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(404);
    });

    // Test case: Attempt to delete a todo with an invalid ID
    it('should return an error when deleting a todo with an invalid ID', async () => {
        const invalidId = 'invalidId';

        await request(app)
            .delete(`/todos/${invalidId}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(404);
    });

    // Test case: Attempt to create a todo with incomplete data
    it('should return an error when creating a todo with incomplete data', async () => {
        const incompleteData = { /* Provide incomplete todo data */ };

        const response = await request(app)
            .post('/todos')
            .set('Authorization', 'Bearer ' + JWT)
            .send(incompleteTodoData)
            .expect(400);

        expect(response.body.errors).toBeDefined();
        expect(Array.isArray(response.body.errors)).toBeTruthy();
    });

    // Test case: Delete a todo by ID
    it('should delete a todo by ID', async () => {

        const response = await request(app)
            .delete(`/todos/${TODO._id}`)
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200);

        expect(response.body._id).toBe(TODO._id);
    });
});
