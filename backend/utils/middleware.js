const logger = require('./logger')

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:  ', req.path)
    logger.info('Body:  ', req.body)
    logger.info('---')
    next()
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)
  
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(400).send({ error: 'username and/or email must be unique' })
    }
  
    next(err)
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
    requestLogger,
    errorHandler, 
    unknownEndpoint
}