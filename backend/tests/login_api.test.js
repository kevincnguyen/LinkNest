const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../app');

const api = supertest(app);

const User = require('../models/user');
const helper = require('./helper');

describe('User does not exist', () => {
  test('Login is unsuccessful', async () => {
    const response = await api.post('/api/login')
      .send({
        username: 'jsmith',
        password: 'wrong',
      })
      .expect(401)
      .expect('Content-Type', /application\/json/);
    expect(response.body.error).toBe('Invalid username or password');
  }, 100000);
});

describe('User already exists', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('password', 10);
    const user = new User({ ...helper.initialUsers[0], password: passwordHash });
    await user.save();
  });

  test('Login successful with correct credentials', async () => {
    const response = await api.post('/api/login')
      .send({
        username: 'jsmith',
        password: 'password',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body.message).toBe('Login successful');
  }, 100000);

  test('Login unsuccessful with incorrect credentials', async () => {
    const response = await api.post('/api/login')
      .send({
        username: 'jsmith',
        password: 'wrong',
      })
      .expect(401)
      .expect('Content-Type', /application\/json/);
    expect(response.body.error).toBe('Invalid username or password');
  }, 100000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
