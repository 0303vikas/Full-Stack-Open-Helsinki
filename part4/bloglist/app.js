const express = require('express')
const app = express()
const cors = require('cors')
const blogroutes = require('./controllers/blogs')
const mongoose = require('mongoose')
const {
  requestLogger,
  unknownEndpoint,
  errorhandlingfunction
}  = require('./utils/middleware')
const {
  MONGODB_URI
} = require('./utils/config')

const {
  infoHandler,
  errorHandler
} = require('./utils/logger')


mongoose.connect(MONGODB_URI)
  .then(() => infoHandler('Connected to Mongodb'))
  .catch((error => errorHandler(`Error connecting to database ${error.message}`)))


app.use(cors())
app.use(express.json())

app.use(requestLogger)
app.use('/api/blogs',blogroutes)


app.use(unknownEndpoint)
app.use(errorhandlingfunction)

module.exports = app

