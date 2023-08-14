const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();

const User = require('../models/user');
const { createAccessToken, createRefreshToken, sendRefreshToken } = require('../utils/auth');

// @desc Logs in user
// @route POST /api/login
// @access Public
loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({
      error: 'All fields required',
    });
  }

  const user = await User.findOne({ username: username.toLowerCase() })
    .populate('links', {
      id: 1, url: 1, desc: 1, position: 1,
    });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password',
    });
  }

  sendRefreshToken(res, createRefreshToken(user));

  res.json({
    message: 'Login successful',
    accessToken: createAccessToken(user),
    user,
  });
});

module.exports = loginRouter;
