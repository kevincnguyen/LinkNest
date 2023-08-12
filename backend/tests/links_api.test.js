const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../app');

const api = supertest(app);

const User = require('../models/user');
const Link = require('../models/link');
const helper = require('./helper');

describe('Addition of new Link', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    for (const user of helper.initialUsers) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(user.password, saltRounds);
      const updatedUser = new User({ ...user, password: passwordHash });
      await updatedUser.save();
    }

    await Link.deleteMany({});
    const users = await helper.usersInDb();
    const newLink = new Link({ ...helper.initialLinks[0], user: users[0].id });
    await newLink.save();
  });

  test('Succeeds if authorized user logged in', async () => {
    const users = await helper.usersInDb();
    const startLinks = (await helper.linksInDb()).map((link) => {
      delete link.id;
      link.user = link.user.toString();
      return link;
    });

    const newLink = {
      ...helper.initialLinks[1],
      user: users[0].id,
    };

    const loggedIn = await api.post('/api/login')
      .send({
        username: 'jsmith',
        password: 'password',
      })
      .expect(200);

    await api.post('/api/links')
      .send(newLink)
      .set('Authorization', `Bearer ${loggedIn.body.accessToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const endLinks = (await helper.linksInDb()).map((link) => {
      delete link.id;
      link.user = link.user.toString();
      return link;
    });

    expect(endLinks).toHaveLength(startLinks.length + 1);
    expect(endLinks).toContainEqual(newLink);
    expect(startLinks).not.toContainEqual(newLink);
  }, 100000);

  test('Fails if unauthorized user logged in', async () => {
    const users = await helper.usersInDb();
    const startLinks = (await helper.linksInDb()).map((link) => {
      delete link.id;
      link.user = link.user.toString();
      return link;
    });

    const newLink = {
      ...helper.initialLinks[1],
      user: users[0].id,
    };

    const loggedIn = await api.post('/api/login')
      .send({
        username: 'bbob',
        password: 'bobbybilly',
      })
      .expect(200);

    const response = await api.post('/api/links')
      .send(newLink)
      .set('Authorization', `Bearer ${loggedIn.body.accessToken}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const endLinks = (await helper.linksInDb()).map((link) => {
      delete link.id;
      link.user = link.user.toString();
      return link;
    });

    expect(response.body.error).toContain('Links can only be added by its authorized user');
    expect(endLinks).toHaveLength(startLinks.length);
    expect(endLinks).not.toContainEqual(newLink);
    expect(startLinks).not.toContainEqual(newLink);
  }, 100000);

  test('Fails if no user logged in', async () => {
    const users = await helper.usersInDb();
    const startLinks = (await helper.linksInDb()).map((link) => {
      delete link.id;
      link.user = link.user.toString();
      return link;
    });

    const newLink = {
      ...helper.initialLinks[1],
      user: users[0].id,
    };

    const response = await api.post('/api/links')
      .send(newLink)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const endLinks = (await helper.linksInDb()).map((link) => {
      delete link.id;
      link.user = link.user.toString();
      return link;
    });

    expect(response.body.error).toContain('Not authenticated');
    expect(endLinks).toHaveLength(startLinks.length);
    expect(endLinks).not.toContainEqual(newLink);
    expect(startLinks).not.toContainEqual(newLink);
  }, 100000);

  test('Fails with 400 if url is missing', async () => {
    const users = await helper.usersInDb();
    const startLinks = await helper.linksInDb();

    const newLink = {
      desc: 'Connect with me',
      position: 0,
      user: users[0].id,
    };

    const loggedIn = await api.post('/api/login')
      .send({
        username: 'jsmith',
        password: 'password',
      })
      .expect(200);

    const response = await api.post('/api/links')
      .send(newLink)
      .set('Authorization', `Bearer ${loggedIn.body.accessToken}`)
      .expect(400);

    const endLinks = (await helper.linksInDb()).map((link) => {
      delete link.id;
      link.user = link.user.toString();
      return link;
    });

    expect(response.body.error).toContain('url required');
    expect(endLinks).toHaveLength(startLinks.length);
    expect(endLinks).not.toContainEqual(newLink);
  }, 100000);

  test('Fails with 400 if desc is missing', async () => {
    const users = await helper.usersInDb();
    const startLinks = await helper.linksInDb();

    const newLink = {
      url: 'www.linkedin.com',
      position: 0,
      user: users[0].id,
    };

    const loggedIn = await api.post('/api/login')
      .send({
        username: 'jsmith',
        password: 'password',
      })
      .expect(200);

    const response = await api.post('/api/links')
      .send(newLink)
      .set('Authorization', `Bearer ${loggedIn.body.accessToken}`)
      .expect(400);

    const endLinks = (await helper.linksInDb()).map((link) => {
      delete link.id;
      link.user = link.user.toString();
      return link;
    });

    expect(response.body.error).toContain('description required');
    expect(endLinks).toHaveLength(startLinks.length);
    expect(endLinks).not.toContainEqual(newLink);
  }, 100000);

  test('Fails with 400 if position is missing', async () => {
    const users = await helper.usersInDb();
    const startLinks = await helper.linksInDb();

    const newLink = {
      url: 'www.linkedin.com',
      desc: 'Connect with me',
      user: users[0].id,
    };

    const loggedIn = await api.post('/api/login')
      .send({
        username: 'jsmith',
        password: 'password',
      })
      .expect(200);

    const response = await api.post('/api/links')
      .send(newLink)
      .set('Authorization', `Bearer ${loggedIn.body.accessToken}`)
      .expect(400);

    const endLinks = (await helper.linksInDb()).map((link) => {
      delete link.id;
      link.user = link.user.toString();
      return link;
    });

    expect(response.body.error).toContain('position required');
    expect(endLinks).toHaveLength(startLinks.length);
    expect(endLinks).not.toContainEqual(newLink);
  }, 100000);

  test('Fails with 400 if user is missing', async () => {
    const startLinks = await helper.linksInDb();

    const newLink = {
      url: 'www.linkedin.com',
      desc: 'Connect with me',
      position: 0,
    };

    const loggedIn = await api.post('/api/login')
      .send({
        username: 'jsmith',
        password: 'password',
      })
      .expect(200);

    const response = await api.post('/api/links')
      .send(newLink)
      .set('Authorization', `Bearer ${loggedIn.body.accessToken}`)
      .expect(400);

    const endLinks = (await helper.linksInDb()).map((link) => {
      delete link.id;
      link.user = link.user.toString();
      return link;
    });

    expect(response.body.error).toContain('User required');
    expect(endLinks).toHaveLength(startLinks.length);
    expect(endLinks).not.toContainEqual(newLink);
  }, 100000);
});

describe('Updating existing Link', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    for (const user of helper.initialUsers) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(user.password, saltRounds);
      const updatedUser = new User({ ...user, password: passwordHash });
      await updatedUser.save();
    }

    await Link.deleteMany({});
    const users = await helper.usersInDb();
    for (const link of helper.initialLinks) {
      const newLink = new Link({ ...link, user: users[0].id });
      await newLink.save();
    }
  });

  test('Succeeds if authorized user logged in', async () => {
    const users = await helper.usersInDb();
    let startLinks = await helper.linksInDb();

    const updatedLink = {
      url: 'www.twitter.com',
      desc: 'Check out my Twitter',
      position: 1,
      user: users[0].id,
    };

    const loggedIn = await api.post('/api/login')
      .send({
        username: 'jsmith',
        password: 'password',
      })
      .expect(200);

    await api.put(`/api/links/${startLinks[0].id}`)
      .send(updatedLink)
      .set('Authorization', `Bearer ${loggedIn.body.accessToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    startLinks = startLinks.map((link) => {
      delete link.id;
      link.user = link.user.toString();
      return link;
    });

    const endLinks = (await helper.linksInDb()).map((link) => {
      delete link.id;
      link.user = link.user.toString();
      return link;
    });

    expect(endLinks).toHaveLength(startLinks.length);
    expect(endLinks).toContainEqual(updatedLink);
    expect(startLinks).not.toContainEqual(updatedLink);
  }, 100000);

  test('Fails if unauthorized user logged in', async () => {
    const users = await helper.usersInDb();
    const startLinks = await helper.linksInDb();

    const updatedLink = {
      url: 'www.twitter.com',
      desc: 'Check out my Twitter',
      position: 1,
      user: users[0].id,
    };

    const loggedIn = await api.post('/api/login')
      .send({
        username: 'bbob',
        password: 'bobbybilly',
      })
      .expect(200);

    const response = await api.put(`/api/links/${startLinks[0].id}`)
      .send(updatedLink)
      .set('Authorization', `Bearer ${loggedIn.body.accessToken}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const endLinks = (await helper.linksInDb()).map((link) => {
      delete link.id;
      link.user = link.user.toString();
      return link;
    });

    expect(endLinks).toHaveLength(startLinks.length);
    expect(endLinks).not.toContainEqual(updatedLink);
    expect(response.body.error).toContain('this link can only be updated by its authorized user');
  }, 100000);

  test('Fails if no user logged in', async () => {
    const users = await helper.usersInDb();
    const startLinks = await helper.linksInDb();

    const updatedLink = {
      url: 'www.twitter.com',
      desc: 'Check out my Twitter',
      position: 1,
      user: users[0].id,
    };

    const response = await api.put(`/api/links/${startLinks[0].id}`)
      .send(updatedLink)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const endLinks = (await helper.linksInDb()).map((link) => {
      delete link.id;
      link.user = link.user.toString();
      return link;
    });

    expect(endLinks).toHaveLength(startLinks.length);
    expect(endLinks).not.toContainEqual(updatedLink);
    expect(response.body.error).toContain('Not authenticated');
  }, 100000);
});

describe('Deleting existing Link', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    for (const user of helper.initialUsers) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(user.password, saltRounds);
      const updatedUser = new User({ ...user, password: passwordHash });
      await updatedUser.save();
    }

    await Link.deleteMany({});
    const users = await helper.usersInDb();
    for (const link of helper.initialLinks) {
      const newLink = new Link({ ...link, user: users[0].id });
      await newLink.save();
    }
  });

  test('Succeeds if authorized user logged in', async () => {
    const startLinks = await helper.linksInDb();
    const linkToDelete = startLinks[0];

    const loggedIn = await api.post('/api/login')
      .send({
        username: 'jsmith',
        password: 'password',
      })
      .expect(200);

    await api.delete(`/api/links/${linkToDelete.id}`)
      .set('Authorization', `Bearer ${loggedIn.body.accessToken}`)
      .expect(204);

    const endLinks = await helper.linksInDb();

    expect(endLinks).toHaveLength(startLinks.length - 1);
    expect(endLinks).not.toContainEqual(linkToDelete);
  });

  test('Fails if unauthorized user logged in', async () => {
    const startLinks = await helper.linksInDb();
    const linkToDelete = startLinks[0];

    const loggedIn = await api.post('/api/login')
      .send({
        username: 'bbob',
        password: 'bobbybilly',
      })
      .expect(200);

    const response = await api.delete(`/api/links/${linkToDelete.id}`)
      .set('Authorization', `Bearer ${loggedIn.body.accessToken}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const endLinks = await helper.linksInDb();

    expect(endLinks).toHaveLength(startLinks.length);
    expect(response.body.error).toContain('this link can only be deleted by its authorized user');
  }, 100000);

  test('Fails if no user logged in', async () => {
    const startLinks = await helper.linksInDb();
    const linkToDelete = startLinks[0];

    const response = await api.delete(`/api/links/${linkToDelete.id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const endLinks = await helper.linksInDb();

    expect(endLinks).toHaveLength(startLinks.length);
    expect(response.body.error).toContain('Not authenticated');
  });

  test('Fails if link does not exist', async () => {
    const startLinks = await helper.linksInDb();

    const loggedIn = await api.post('/api/login')
      .send({
        username: 'jsmith',
        password: 'password',
      })
      .expect(200);

    await api.delete('/api/links/64c60a101ce9eaf0cd8dffe0')
      .set('Authorization', `Bearer ${loggedIn.body.accessToken}`)
      .expect(404);

    const endLinks = await helper.linksInDb();

    expect(endLinks).toHaveLength(startLinks.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
