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

const tokenExtractor = (req,res,next) => {

  const authorization = req.get('authorization')
  let token = null
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7) }
  // console.log(token)
  req.token = token
  next()
}


const errorhandlingfunction = (error, request, response, next) => {
  errorHandler(error.message)

  if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' })
  else if (error.name === 'ValidationError') return response.status(400).json({ error: error.message })
  else if (error.name === 'JsonWebTokenError') return response.status(401).json({ error: 'invalid token' })
  else if (error.name === 'TokenExpiredError') return response.status(401).json({ error: 'token expired' })

  errorHandler(error.message)
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorhandlingfunction,
  tokenExtractor
}