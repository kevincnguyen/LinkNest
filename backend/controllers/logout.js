const logoutRouter = require('express').Router();

// @desc Logs out user
// @route POST /api/logout
// @access Public
logoutRouter.post('/', (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(204).end();
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 3600000,
  });

  res.json({ message: 'Logged out successfully' });
});

module.exports = logoutRouter;
