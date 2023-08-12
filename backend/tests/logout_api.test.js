const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../app');

const api = supertest(app);

const User = require('../models/user');
const helper = require('./helper');

describe('User logged in', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('password', 10);
    const user = new User({ ...helper.initialUsers[0], password: passwordHash });
    await user.save();
  });

  test('Logout successful', async () => {
    await api.post('/api/login')
      .send({
        username: 'jsmith',
        password: 'password',
      });
    const response = await api.post('/api/logout')
      .set('Cookie', 'refreshToken=12345667')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body.message).toBe('Logged out successfully');
    expect(response.headers['set-cookie'][0]).toContain('refreshToken=;');
  }, 100000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
