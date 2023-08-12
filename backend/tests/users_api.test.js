const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../app');

const api = supertest(app);

const User = require('../models/user');
const helper = require('./helper');

beforeEach(async () => {
  await User.deleteMany({});
  for (const user of helper.initialUsers) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(user.password, saltRounds);
    const updatedUser = new User({ ...user, password: passwordHash });
    await updatedUser.save();
  }
});

describe('Users already exists in DB', () => {
  test('User can be retrieved in JSON by their username', async () => {
    const user = (await helper.usersInDb())[0];
    await api.get(`/api/users/${user.username}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 100000);

  describe('Updating User', () => {
    test('Succeeds if correct User logged in', async () => {
      const startUsers = await helper.usersInDb();

      const updatedUser = {
        name: 'John Smith',
        username: 'smithjohn',
        email: 'johnsmith@gmail.com',
        password: 'password',
      };

      const loggedIn = await api.post('/api/login')
        .send({
          username: 'jsmith',
          password: 'password',
        })
        .expect(200);

      await api.put(`/api/users/${startUsers[0].id}`)
        .send(updatedUser)
        .set('Authorization', `Bearer ${loggedIn.body.accessToken}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const endUsers = await helper.usersInDb();
      const endUsernames = endUsers.map((user) => user.username);

      expect(endUsers).toHaveLength(startUsers.length);
      expect(endUsernames).toContainEqual(updatedUser.username);
      expect(endUsernames).not.toContainEqual(startUsers[0].username);
    });

    test('Fails if incorrect User logged in', async () => {
      const startUsers = await helper.usersInDb();

      const updatedUser = {
        name: 'John Smith',
        username: 'smithjohn',
        email: 'johnsmith@gmail.com',
        password: 'password',
      };

      const loggedIn = await api.post('/api/login')
        .send({
          username: 'bbob',
          password: 'bobbybilly',
        })
        .expect(200);

      await api.put(`/api/users/${startUsers[0].id}`)
        .send(updatedUser)
        .set('Authorization', `Bearer ${loggedIn.body.accessToken}`)
        .expect(401)
        .expect('Content-Type', /application\/json/);

      const endUsers = await helper.usersInDb();
      const endUsernames = endUsers.map((user) => user.username);

      expect(endUsers).toHaveLength(startUsers.length);
      expect(endUsernames).toContainEqual(startUsers[0].username);
      expect(endUsernames).not.toContainEqual(updatedUser.username);
    });

    test('Fails if no Users logged in', async () => {
      const startUsers = await helper.usersInDb();

      const updatedUser = {
        name: 'John Smith',
        username: 'smithjohn',
        email: 'johnsmith@gmail.com',
        password: 'password',
      };

      await api.post('/api/logout');

      const response = await api.put(`/api/users/${startUsers[0].id}`)
        .send(updatedUser)
        .expect(401)
        .expect('Content-Type', /application\/json/);

      const endUsers = await helper.usersInDb();
      const endUsernames = endUsers.map((user) => user.username);

      expect(endUsers).toHaveLength(startUsers.length);
      expect(endUsernames).toContainEqual(startUsers[0].username);
      expect(endUsernames).not.toContainEqual(updatedUser.username);
      expect(response.body.error).toContain('Not authenticated');
    });
  }, 10000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
