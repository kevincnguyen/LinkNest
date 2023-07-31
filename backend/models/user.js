const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name required'],
  },
  username: {
    type: String,
    required: [true, 'username required'],
    unique: [true, 'username must be unique'],
  },
  email: {
    type: String,
    required: [true, 'email required'],
    unique: [true, 'email must be unique'],
  },
  password: {
    type: String,
    minLength: [8, 'password must at least be 8 characters'],
    required: [true, 'password required'],
  },
  bio: String,
  profilepic: String,
  links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Link',
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

module.exports = mongoose.model('User', userSchema);
