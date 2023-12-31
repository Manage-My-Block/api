const { app } = require('../app');
const { seedRoles } = require('../utils/seedFunctions')
const { URL, newUserData } = require('./testData')
const { createUser, loginAdmin, createBuilding } = require('./testFunctions')
const request = require('supertest');
const mongoose = require('mongoose')

let BUILDING

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


describe('Login Route Tests', () => {
    // Test case for successful login
    it('should return a valid JWT token for a valid user', async () => {
        newUserData.building = BUILDING._id

        await createUser(newUserData)

        const response = await request(app)
            .post('/login')
            .send({ email: newUserData.email, password: newUserData.password })
            .expect(200);

        expect(response.body.token).toBeDefined();
    });

    // Test case for logging in admin
    it('should return a valid JWT token for an admin user', async () => {
        const response = await loginAdmin()

        expect(response.JWT).toBeDefined();
        expect(response.USER.email).toStrictEqual('admin@admin.com');
    });

    // Test case for invalid email
    it('should return an error when email is invalid', async () => {
        await request(app)
            .post('/login')
            .send({ email: 'invaliduser', password: newUserData.password })
            .expect(400);
    });

    // Test case for invalid password
    it('should return an error when password is invalid', async () => {
        const response = await request(app)
            .post('/login')
            .send({ email: newUserData.email, password: 'wrongpassword' })
            .expect(401);

        expect(response.body.error).toBe('Invalid email or password');
    });

    // // Test case for missing email
    it('should return an error when email is missing', async () => {
        const response = await request(app)
            .post('/login')
            .send({ password: 'password' })
            .expect(400);

        expect(response.body.errors).toStrictEqual(["Email is required", "Email must be an email"]);
    });

    // // Test case for missing password
    it('should return an error when password is missing', async () => {
        const response = await request(app)
            .post('/login')
            .send({ email: 'john@email.com' })
            .expect(400);

        expect(response.body.errors).toStrictEqual(["Password is required"]);
    });
});