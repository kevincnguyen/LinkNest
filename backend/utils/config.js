require('dotenv').config();

const { PORT, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;

module.exports = {
  PORT,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  MONGODB_URI,
};
