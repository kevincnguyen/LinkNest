const usersRouter = require('express').Router()
const User = require('../models/user')

// gets all users
usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
                            .populate('links', { id: 1, url: 1, desc: 1, position: 1 })
    resjson(users)
})

// gets a specific user
usersRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
                           .populate('links', { id: 1, url: 1, desc: 1, position: 1 })
    res.json(user)
})

// updates specific user info if logged in
usersRouter.put('/:id', async (req, res) => {
    const loggedIn = req.user
    const requestedUser = await User.findById(req.params.id)

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
    const updatedUser = await findByIdAndUpdate(
        req.params.id,
        user,
        { new: true, runValidators: true, context: 'query' }
    )

    res.json(updatedUser)
})

module.exports = usersRouter