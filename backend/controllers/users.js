const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

// get all users
usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

// get a specific user
usersRouter.get('/:username', async (req, res) => {
    const user = await User.find({ username: req.params.username })
    res.status(200).json(user)
})

// update user information only if logged in
usersRouter.put('/:username', async (req, res) => {
    const loggedIn = req.user
    const requestedUser = await User.find({ username: req.params.username })

    if (!requestedUser) {
        return res.status(404).json({ 
            error: 'user not found' 
        })
    }

    if (loggedIn.username !== requestedUser.username) {
        return res.status(401).json({ 
            error: 'user information can only be updated by authorized user' 
        })
    }

    const user = { ...req.body }
    const updatedUser = await findOneAndUpdate(
        { username: req.params.username },
        user,
        { new: true, runValidators: true, context: 'query' }
    )

    res.json(updatedUser)
})

// get links of all users
usersRouter.get('/:username/links', async (req, res) => {
    const user = await User.find({ username: req.params.username })
    res.status(200).json(user.links)
})

// add link only if logged in
usersRouter.post('/:username/links', async (req, res) => {
    const loggedIn = req.user
    const requestedUser = await User.find({ username: req.params.username })

    if (!requestedUser) {
        return res.status(404).json({ 
            error: 'user not found' 
        })
    }

    if (loggedIn.username !== requestedUser.username) {
        return res.status(401).json({ 
            error: 'links can only be added by authorized user' 
        })
    }

    const link = { ...req.body }
    const user = await User.find({ username: req.params.username })
    user.links.concat(link)
    await user.save()
    res.json(user.links)
})

// update link only if logged in
usersRouter.put('/:username/links/:id', async (req, res) => {
    const loggedIn = req.user
    const requestedUser = await User.find({ username: req.params.username })

    if (!requestedUser) {
        return res.status(404).json({ 
            error: 'user not found' 
        })
    }

    if (loggedIn.username !== requestedUser.username) {
        return res.status(401).json({ 
            error: 'this link can only be updated by its authorized user' 
        })
    }
    
    const id = req.params
    const user = await User.find({ username: req.params.username })
    const index = user.links.findIndex(link => link.id.toString() === id.toString())

    if (index === -1) {
        return res.status(404).json({ 
            error: 'link not found' 
        })
    }

    user.links[index] = { ...req.body }
    await user.save()
    res.json(user.links[index])
})

// delete link only if logged in
usersRouter.delete('/:username/links/:id', async (req, res) => {
    const loggedIn = req.user
    const requestedUser = await User.find({ username: req.params.username })

    if (!requestedUser) {
        return res.status(404).json({ 
            error: 'user not found' 
        })
    }

    if (loggedIn.username !== requestedUser.username) {
        return res.status(401).json({ 
            error: 'this link can only be updated by its authorized user' 
        })
    }

    const user = await User.find({ username: req.params.username })
    user.links = user.links.filter(link => link.id.toString() !== id.toString())
    await user.save()
    res.json(user.links)
})

module.exports = usersRouter