const logoutRouter = require('express').Router();

logoutRouter.post('/', (req, res) => {
  res.clearCookie('jwtToken');
  res.json({ message: 'Logged out successfully' });
});

module.exports = logoutRouter;
