const User = require('../models/user');
const Link = require('../models/link');

const initialUsers = [
  {
    name: 'John Smith',
    username: 'jsmith',
    email: 'johnsmith@gmail.com',
    password: 'password',
  },
  {
    name: 'Billy Bob',
    username: 'bbob',
    email: 'billybob@gmail.com',
    password: 'bobbybilly',
  },
];

const initialLinks = [
  {
    url: 'www.instagram.com',
    desc: 'Check out my Instagram',
    position: 0,
  },
  {
    url: 'www.linkedin.com',
    desc: 'Connect with me',
    position: 0,
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const linksInDb = async () => {
  const links = await Link.find({});
  return links.map((link) => link.toJSON());
};

module.exports = {
  initialUsers,
  initialLinks,
  usersInDb,
  linksInDb,
};
