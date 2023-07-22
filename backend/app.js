const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.requestLogger)

// connect to db
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((err) => {
        logger.error('error connecting to MongoDB:', err.message);
    })

// routes
app.get('/', (req, res) => {
    res.send('Hello, World')
})

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app