const {
  infoHandler,
  errorHandler
} = require('./logger')

const requestLogger = (request, response, next) => {
  infoHandler('Method:', request.method)
  infoHandler('Path:  ', request.path)
  infoHandler('Body:  ', request.body)
  infoHandler('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorhandlingfunction = (error, request, response, next) => {
  errorHandler(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorhandlingfunction
}