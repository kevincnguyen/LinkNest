const linksRouter = require('express').Router();
const Link = require('../models/link');
const middleware = require('../utils/middleware');

// @desc Adds a link
// @route POST /api/links
// @access Private
linksRouter.post('/', middleware.verifyJWT, async (req, res) => {
  const { user } = req;

  if (!req.body.user) {
    return res.status(400).json({
      error: 'User required',
    });
  }

  if (req.body.user.toString() !== user.id.toString()) {
    return res.status(401).json({
      error: 'Links can only be added by its authorized user',
    });
  }

  const link = new Link({
    ...req.body,
    user: user.id,
  });

  const updatedLink = await link.save();

  user.links = user.links.concat(link.id);
  await user.save();

  res.status(201).json(updatedLink);
});

// @desc Updates a link
// @route PUT /api/links/:id
// @access Private
linksRouter.put('/:id', middleware.verifyJWT, async (req, res) => {
  const { user } = req;
  const requestLink = await Link.findById(req.params.id);

  if (!requestLink) {
    return res.status(404).json({
      error: 'Link not found',
    });
  }

  if (requestLink.user.toString() !== user.id.toString()) {
    return res.status(401).json({
      error: 'this link can only be updated by its authorized user',
    });
  }

  const link = { ...req.body };

  const updatedLink = await Link.findByIdAndUpdate(
    req.params.id,
    link,
    { new: true, runValidators: true, context: 'query' },
  );

  res.json(updatedLink);
});

// @desc Deletes a link
// @route DELETE /api/links/:id
// @access Private
linksRouter.delete('/:id', middleware.verifyJWT, async (req, res) => {
  const { user } = req;
  const requestLink = await Link.findById(req.params.id);

  if (!requestLink) {
    res.status(404).end();
  }

  if (requestLink.user.toString() !== user.id.toString()) {
    return res.status(401).json({
      error: 'this link can only be deleted by its authorized user',
    });
  }

  const result = await Link.findByIdAndRemove(req.params.id);
  if (result) {
    res.status(204).end();
  }
});

module.exports = linksRouter;
