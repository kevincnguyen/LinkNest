const bcrypt = require('bcryptjs');
const signupRouter = require('express').Router();
const User = require('../models/user');

// @desc Create new user
// @route POST /api/signup
// @access Public
signupRouter.post('/', async (req, res) => {
  const {
    name, username, email, password,
  } = req.body;

  if (!password) {
    return res.status(400).json({
      error: 'password required',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    username,
    email,
    password: passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = signupRouter;
