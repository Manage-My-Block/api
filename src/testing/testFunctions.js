const { app } = require('../app');
const request = require('supertest');

const createUser = async (data) => {
    const response = await request(app)
        .post('/register')
        .send(data)

    return { USER: response.body.newUser, JWT: response.body.token }
}

module.exports = { createUser }