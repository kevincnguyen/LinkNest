const jwt = require('jsonwebtoken');
const refreshRouter = require('express').Router();

const { createAccessToken } = require('../utils/auth');
const logger = require('../utils/logger');
const config = require('../utils/config');
const User = require('../models/user');

// @desc Refreshes access token
// @route POST /api/refresh
// @access Private
refreshRouter.post('/', async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).send({
      message: 'Unauthorized',
      valid: false,
      accessToken: '',
    });
  }

  let decodedToken = null;
  try {
    decodedToken = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
  } catch (e) {
    logger.error('error: ', e);
    return res.status(401).send({
      message: 'Unauthorized',
      valid: false,
      accessToken: '',
    });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).send({
      message: 'Unauthorized',
      valid: false,
      accessToken: '',
    });
  }

  return res.send({ valid: true, accessToken: createAccessToken(user) });
});

module.exports = refreshRouter;
