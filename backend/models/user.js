const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required']
    },
    username: {
        type: String,
        required: [true, 'username required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true
    }, 
    passwordHash: {
        type: String,
        minLength: [8, 'password must at least be 8 characters'],
        required: [true, 'password required']
    },
    bio: String,
    profilepic: String,
    links: [
        {
            url: {
                type: String,
                required: [true, 'url required']
            }, 
            position: {
                type: Number, 
                required: [true, 'position required']
            },
            description: {
                type: String,
                required: [true, 'description required']
            }
        }
    ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash;
    }
})

module.exports = mongoose.model('User', userSchema)