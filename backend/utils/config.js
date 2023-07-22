require('dotenv').config()

const PORT = process.env.PORT
const SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  PORT,
  SECRET,
  MONGODB_URI
}