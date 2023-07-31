const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const userExtractor = async (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' });
    }
    req.user = await User.findById(decodedToken.id);
  } else {
    return res.status(401).json({ error: 'no user logged in' });
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: err.message });
  } if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' });
  }

  next(err);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  requestLogger,
  userExtractor,
  errorHandler,
  unknownEndpoint,
};
