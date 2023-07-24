const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcryptjs')
const User = require('../models/user')
const helper = require('./helper')

describe('User logged in', () => {
    beforeAll(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('password', 10);
        const user = new User({ ...helper.initialUsers[0], password: passwordHash})
        await user.save()
        await api.post('/api/login')
                 .send({
                    username: 'jsmith', 
                    password: 'password'
                 })
    })

    test('Logout successful and clears JWT token cookie', async () => {
        const response = await api.post('/api/logout')
                                  .expect(200)
                                  .expect('Content-Type', /application\/json/)
        expect(response.body.message).toBe('Logged out successfully')
        expect(response.headers['set-cookie'][0]).toContain('jwtToken=;')
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})