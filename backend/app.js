const path = require('path');
const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('express-async-errors');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const usersRouter = require('./controllers/users');
const linksRouter = require('./controllers/links');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const signupRouter = require('./controllers/signup');
const refreshRouter = require('./controllers/refresh');

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.static('dist'));
app.use(cookieParser());
app.use(middleware.requestLogger);

// connect to db
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((err) => {
    logger.error('error connecting to MongoDB:', err.message);
  });

app.use('/api/users', usersRouter);
app.use('/api/links', linksRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/signup', signupRouter);
app.use('/api/refresh', refreshRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
