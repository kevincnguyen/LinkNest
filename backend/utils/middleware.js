const jwt = require('jsonwebtoken');
const logger = require('./logger');
const config = require('./config');
const User = require('../models/user');

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const verifyJWT = async (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '');
  }
  const { token } = req;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  req.user = await User.findById(decodedToken.id);

  next();
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: err.message });
  } if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Expired token' });
  }

  next(err);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' });
};

module.exports = {
  requestLogger,
  verifyJWT,
  errorHandler,
  unknownEndpoint,
};
