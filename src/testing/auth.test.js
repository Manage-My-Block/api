const { app } = require('../app');
const { seedRoles, seedUsers, seedTodos } = require('../controllers/Seeding/seedController')
const { URL, newUserData, incompleteUserData, updatedUserData } = require('./testData')
const { createUser } = require('./testFunctions')
const request = require('supertest');
const mongoose = require('mongoose')


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


describe('Login Route Tests', () => {
    // Test case for successful login
    it('should return a valid JWT token for a valid user', async () => {
        await createUser()

        const response = await request(app)
            .post('/login')
            .send({ username: newUserData.username, password: newUserData.password })
            .expect(200);

        expect(response.body.token).toBeDefined();
    });

    // Test case for invalid username
    it('should return an error when username is invalid', async () => {
        await request(app)
            .post('/login')
            .send({ username: 'invaliduser', password: newUserData.password })
            .expect(400);
    });

    // Test case for invalid password
    it('should return an error when password is invalid', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: newUserData.username, password: 'wrongpassword' })
            .expect(401);

        expect(response.body.error).toBe('Invalid username or password');
    });

    // // Test case for missing username
    it('should return an error when username is missing', async () => {
        const response = await request(app)
            .post('/login')
            .send({ password: 'password' })
            .expect(400);

        expect(response.body.errors).toStrictEqual(["Username is required", "Username must be an email"]);
    });

    // // Test case for missing password
    it('should return an error when password is missing', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'john@email.com' })
            .expect(400);

        expect(response.body.errors).toStrictEqual(["Password is required"]);
    });
});