const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');
const middleware = require('../utils/middleware');

// (DELETE?)
// @desc Gets all users
// @route /api/users
// @access Public
usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('links', {
      id: 1, url: 1, desc: 1, position: 1,
    });
  res.json(users);
});

// @desc Gets a specific user
// @route GET /api/users
// @access Public
usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate('links', {
      id: 1, url: 1, desc: 1, position: 1,
    });
  res.json(user);
});

// @desc Updates specific user
// @route PUT /api/users/:id
// @access Private
usersRouter.put('/:id', middleware.verifyJWT, async (req, res) => {
  const loggedIn = req.user;
  const requestedUser = await User.findById(req.params.id);

  if (!requestedUser) {
    return res.status(404).json({
      error: 'User not found',
    });
  }

  if (loggedIn.id.toString() !== requestedUser.id.toString()) {
    return res.status(401).json({
      error: 'User information can only be updated by authorized user',
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
