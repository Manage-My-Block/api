const { app } = require('../app');
const request = require('supertest');

const createBuilding = async () => {
    const response = await request(app)
        .post('/buildings')
        .send({
            buildingData: {
                name: "Melbourne Tower Heights",
                address: "111 Big Street, Richmond, Melbourne",
                apartmentCount: 28
            },
            userData: {
                email: 'admin@admin.com',
                password: '123456',
                apartment: 0,
                name: 'Admin'
            }
        })

    return { BUILDING: response.body.building, USER: response.body.user, TOKEN: response.body.token }
}

const createUser = async (data) => {
    const response = await request(app)
        .post('/register')
        .send(data)

    return { USER: response.body.user, JWT: response.body.token }
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

const loginCommittee = async () => {
    const response = await request(app)
        .post('/login')
        .send({
            email: 'committee@committee.com',
            password: '123456',
        })

    return { USER: response.body.user, JWT: response.body.token }
}

module.exports = { createUser, loginAdmin, loginCommittee, createBuilding }