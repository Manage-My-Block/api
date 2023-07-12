const { app } = require('../app');
const request = require('supertest');

const createUser = async (data) => {
    const response = await request(app)
        .post('/register')
        .send(data)

    return { USER: response.body.newUser, JWT: response.body.token }
}

const loginAdmin = async () => {
    const response = await request(app)
        .post('/login')
        .send({
            email: 'admin@admin.com',
            password: '123456',
        })

    return { USER: response.body.user, JWT: response.body.token }
}

module.exports = { createUser, loginAdmin }