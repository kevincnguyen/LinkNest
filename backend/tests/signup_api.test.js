const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../app');

const api = supertest(app);

const User = require('../models/user');
const helper = require('./helper');

describe('Addition of user', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('password', 10);
    const user = new User({ ...helper.initialUsers[0], password: passwordHash });
    await user.save();
  });

  test('Succeeds with valid data', async () => {
    const startUsers = await helper.usersInDb();

    const newUser = helper.initialUsers[1];

    await api
      .post('/api/signup')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const endUsers = await helper.usersInDb();
    expect(endUsers).toHaveLength(startUsers.length + 1);

    const startUsernames = startUsers.map((u) => u.username);
    expect(startUsernames).not.toContain(newUser.username);

    const endUsernames = endUsers.map((u) => u.username);
    expect(endUsernames).toContain(newUser.username);
  }, 100000);

  test('Fails with 400 if missing name', async () => {
    const startUsers = await helper.usersInDb();

    const newUser = {
      username: 'bbob',
      email: 'billybob@gmail.com',
      password: 'bobilly',
    };

    const result = await api
      .post('/api/signup')
      .send(newUser)
      .expect(400);

    expect(result.body.error).toContain('name required');

    const endUsers = await helper.usersInDb();
    expect(endUsers).toHaveLength(startUsers.length);

    const endUsernames = endUsers.map((u) => u.username);
    expect(endUsernames).not.toContain(newUser.username);
  }, 100000);

  test('Fails with 400 if missing username', async () => {
    const startUsers = await helper.usersInDb();

    const newUser = {
      name: 'Billy Bob',
      email: 'billybob@gmail.com',
      password: 'bobilly',
    };

    const result = await api
      .post('/api/signup')
      .send(newUser)
      .expect(400);

    expect(result.body.error).toContain('username required');

    const endUsers = await helper.usersInDb();
    expect(endUsers).toHaveLength(startUsers.length);

    const endEmails = endUsers.map((u) => u.email);
    expect(endEmails).not.toContain(newUser.email);
  }, 100000);

  test('Fails with 400 if missing email', async () => {
    const startUsers = await helper.usersInDb();

    const newUser = {
      name: 'Billy Bob',
      username: 'bbob',
      password: 'bobilly',
    };

    const result = await api
      .post('/api/signup')
      .send(newUser)
      .expect(400);

    expect(result.body.error).toContain('email required');

    const endUsers = await helper.usersInDb();
    expect(endUsers).toHaveLength(startUsers.length);

    const endUsernames = endUsers.map((u) => u.username);
    expect(endUsernames).not.toContain(newUser.username);
  }, 100000);

  test('Fails with 400 if missing password', async () => {
    const startUsers = await helper.usersInDb();

    const newUser = {
      name: 'Billy Bob',
      username: 'bbob',
      email: 'billybob@gmail.com',
    };

    const result = await api
      .post('/api/signup')
      .send(newUser)
      .expect(400);

    expect(result.body.error).toContain('password required');

    const endUsers = await helper.usersInDb();
    expect(endUsers).toHaveLength(startUsers.length);

    const endUsernames = endUsers.map((u) => u.username);
    expect(endUsernames).not.toContain(newUser.username);
  }, 100000);

  test('Fails with 400 if username already exists', async () => {
    const startUsers = await helper.usersInDb();
    const startUsernames = startUsers.map((u) => u.username);

    const newUser = {
      name: 'John Smith',
      username: 'jsmith',
      email: 'test@gmail.com',
      password: 'password',
    };

    expect(startUsernames).toContain('jsmith');

    const result = await api
      .post('/api/signup')
      .send(newUser)
      .expect(400);

    expect(result.body.error).toContain('User validation failed: username: Error, expected `username` to be unique. Value: `jsmith`');

    const endUsers = await helper.usersInDb();
    expect(endUsers).toHaveLength(startUsers.length);
  }, 100000);

  test('Fails with 400 if email already exists', async () => {
    const startUsers = await helper.usersInDb();

    const newUser = {
      name: 'John Smith',
      username: 'johns',
      email: 'johnsmith@gmail.com',
      password: 'password',
    };

    const result = await api
      .post('/api/signup')
      .send(newUser)
      .expect(400);

    expect(result.body.error).toContain('User validation failed: email: Error, expected `email` to be unique. Value: `johnsmith@gmail.com`');

    const endUsers = await helper.usersInDb();
    expect(endUsers).toHaveLength(startUsers.length);
  }, 100000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
