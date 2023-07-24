const linksRouter = require('express').Router()
const Link = require('../models/link')

// gets all links
linksRouter.get('/', async (req, res) => {
    const links = await Link.find({})
                            .populate('user', { id: 1, name: 1, username: 1 })
    res.json(links)
})

// adds link if logged in
linksRouter.post('/', async (req, res) => {
    const user = req.user

    if (req.body.user.toString() !== user.id.toString()) {
        return response.status(401).json({ 
            error: 'links can only be added by its authorized user ' 
        })
    }

    const link = new Link ({ 
        ...req.body, 
        position: req.body.position || user.links.length,
        user: user.id 
    })

    link.populate('user', { id: 1, name: 1, username: 1 })
    const updatedLink = await link.save()

    user.links = user.links.concat(link.id)
    await user.save()

    res.status(201).json(updatedLink)
})


// updates link if logged in
linksRouter.put('/:id', async (req, res) => {
    const user = req.user
    const requestLink = await Link.findById(request.params.id)

    if (requestLink.user.toString() !== user.id.toString()) {
        return response.status(401).json({ 
            error: 'this link can only be updated by its authorized user ' 
        })
    }

    const link = { ...req.body }

    const updatedLink = Link.findByIdAndUpdate(
        req.params.id,
        link,
        { new: true, runValidators: true, context: 'query' }
    )

    res.json(updatedLink)
})

// delete link only if logged in
linksRouter.delete('/:username/links/:id', async (req, res) => {
    const user = req.user
    const requestLink = await Link.findById(request.params.id)

    if (requestLink.user.toString() !== user.id.toString()) {
        return response.status(401).json({ 
            error: 'this link can only be deleted by its authorized user ' 
        })
    }

    const result = await Link.findByIdAndRemove(request.params.id)
    if (result) {
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

module.exports = linksRouter