const { app } = require('../app');
const { JWT, USER, URL, newUserData, incompleteUserData, updatedUserData } = require('./testData')
const request = require('supertest');

const createUser = async () => {
    const response = await request(app)
        .post('/users')
        .send(newUserData)

    // JWT = response.body.token
    // USER = response.body.newUser

    return { USER: response.body.newUser, JWT: response.body.token }
}

module.exports = { createUser }