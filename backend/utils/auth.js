const jwt = require('jsonwebtoken');
const config = require('./config');

const createAccessToken = (user) => (
  jwt.sign(
    { id: user.id, username: user.username },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: '5s' },
  )
);

const createRefreshToken = (user) => (
  jwt.sign(
    { id: user.id, username: user.username },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: '20s' },
  )
);

const sendRefreshToken = (res, token) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 3600000,
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
};
