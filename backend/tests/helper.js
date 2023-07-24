const User = require('../models/user')

const initialUsers = [
    {
        name: 'John Smith',
        username: 'jsmith',
        email: 'johnsmith@gmail.com', 
        password: 'password'
    },
    {
        name: 'Billy Bob', 
        username: 'bbob',
        email: 'billybob@gmail.com', 
        password: 'bobilly'
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialUsers,
    usersInDb
}