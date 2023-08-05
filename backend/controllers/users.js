const path = require('path');
const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();

const User = require('../models/user');
const upload = require('../utils/multer');
const middleware = require('../utils/middleware');

// @desc Gets a specific user
// @route GET /api/users/:id
// @access Public
usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate('links', {
      id: 1, url: 1, desc: 1, position: 1,
    });
  res.json(user);
});

// @desc Gets profile picture of a specific user
// @route GET /api/users/profiles/:file
// @access Public
usersRouter.get('/profiles/:file', async (req, res) => {
  const fileName = req.params.file;
  const filePath = path.join(__dirname, '..', 'uploads', fileName);
  res.sendFile(filePath);
});

// @desc Updates specific user
// @route PUT /api/users/:id
// @access Private
usersRouter.put('/:id', middleware.verifyJWT, upload.single('profilepic'), async (req, res) => {
  const loggedIn = req.user;
  const requestedUser = await User.findById(req.params.id);

  if (!requestedUser) {
    return res.status(404).json({
      error: 'User not found',
    });
  }

  if (loggedIn.id.toString() !== requestedUser.id.toString()) {
    return res.status(401).json({
      error: 'User information can only be updated by authorized user',
    });
  }

  let user = { ...req.body };
  if (req.body.password) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
    user = { ...user, password: passwordHash };
  }
  if (req.file) {
    user = { ...user, profilepic: req.file.filename };
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    user,
    { new: true, runValidators: true, context: 'query' },
  );

  res.json(updatedUser);
});

module.exports = usersRouter;
