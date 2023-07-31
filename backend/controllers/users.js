const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');
const middleware = require('../utils/middleware');

// gets all users
usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('links', {
      id: 1, url: 1, desc: 1, position: 1,
    });
  res.json(users);
});

// gets a specific user
usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate('links', {
      id: 1, url: 1, desc: 1, position: 1,
    });
  res.json(user);
});

// updates specific user info if logged in
usersRouter.put('/:id', middleware.userExtractor, async (req, res) => {
  const loggedIn = req.user;
  const requestedUser = await User.findById(req.params.id);

  if (!requestedUser) {
    return res.status(404).json({
      error: 'user not found',
    });
  }

  if (loggedIn.id.toString() !== requestedUser.id.toString()) {
    return res.status(401).json({
      error: 'user information can only be updated by authorized user',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

  const user = { ...req.body, password: passwordHash };
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    user,
    { new: true, runValidators: true, context: 'query' },
  );

  res.json(updatedUser);
});

module.exports = usersRouter;
