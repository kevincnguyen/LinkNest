const authRouter = require('express').Router();
const middleware = require('../utils/middleware');

authRouter.get('/', middleware.userExtractor, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'Invalid token',
    });
  }
  res.status(200).json({ message: 'Authenticated' });
});

module.exports = authRouter;
