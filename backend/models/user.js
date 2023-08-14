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
    uniqueCaseInsensitive: true,
  },
  email: {
    type: String,
    required: [true, 'email required'],
    unique: [true, 'email must be unique'],
    uniqueCaseInsensitive: true,
  },
  password: {
    type: String,
    minLength: [8, 'password must at least be 8 characters'],
    required: [true, 'password required'],
  },
  profilepic: {
    type: String,
    required: [true, 'profile picture required'],
    default: 'default.png',
  },
  title: {
    type: String,
    required: [true, 'title required'],
  },
  bio: {
    type: String,
    default: '',
  },
  links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Link',
    },
  ],
});

// eslint-disable-next-line func-names
userSchema.pre('validate', function (next) {
  this.title = `@${this.username}`;
  next();
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.email;
    delete returnedObject.password;
  },
});

module.exports = mongoose.model('User', userSchema);
