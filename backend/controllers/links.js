const linksRouter = require('express').Router()
const Link = require('../models/link')
const middleware = require('../utils/middleware')

// gets all links
linksRouter.get('/', async (req, res) => {
    const links = await Link.find({})
                            .populate('user', { id: 1, name: 1, username: 1 })
    res.json(links)
})

// adds link if logged in
linksRouter.post('/', middleware.userExtractor, async (req, res) => {
    const user = req.user

    if (!req.body.user) {
        return res.status(400).json({ 
            error: 'user required' 
        })
    }

    if (req.body.user.toString() !== user.id.toString()) {
        return res.status(401).json({ 
            error: 'links can only be added by its authorized user' 
        })
    }

    const link = new Link ({ 
        ...req.body, 
        user: user.id 
    })

    link.populate('user', { id: 1, name: 1, username: 1 })
    const updatedLink = await link.save()

    user.links = user.links.concat(link.id)
    await user.save()

    res.status(201).json(updatedLink)
})


// updates link if logged in
linksRouter.put('/:id', middleware.userExtractor, async (req, res) => {
    const user = req.user
    const requestLink = await Link.findById(req.params.id)

    if (requestLink.user.toString() !== user.id.toString()) {
        return res.status(401).json({ 
            error: 'this link can only be updated by its authorized user' 
        })
    }

    if (!req.body.url) {
        return res.status(400).json({  error: 'url required' })
    } else if (!req.body.desc) {
        return res.status(400).json({  error: 'description required' })
    } else if (!req.body.position) {
        return res.status(400).json({  error: 'position required' })
    } else if (!req.body.user) {
        return res.status(400).json({  error: 'user required' })
    }

    const link = { ...req.body }

    const updatedLink = await Link.findByIdAndUpdate(
        req.params.id,
        link,
        { new: true, runValidators: true, context: 'query' }
    )

    res.json(updatedLink)
})

// delete link only if logged in
linksRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
    const user = req.user
    const requestLink = await Link.findById(req.params.id)

    if (!requestLink) {
        res.status(404).end()
    }

    if (requestLink.user.toString() !== user.id.toString()) {
        return res.status(401).json({ 
            error: 'this link can only be deleted by its authorized user' 
        })
    }

    const result = await Link.findByIdAndRemove(req.params.id)
    if (result) {
        res.status(204).end()
    } 
})

module.exports = linksRouter