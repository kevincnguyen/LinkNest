require('dotenv').config()
const express = require("express")
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// routes:

// tester endpoint
app.get('/', (req, res) => {
    res.send('Hello, World')
})

// middleware:

const reqLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next()
}

const errorHandler = (err, req, res, next) => {
    console.error(err.message)
  
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(400).send({ error: 'username and/or email must be unique' })
    }
  
    next(err)
}

const unknownEndpoint = (req, res) => {
    res.status(404)
       .send({ error: 'unknown endpoint' })
}
 
app.use(reqLogger)
app.use(errorHandler)
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})