const infoHandler = (...params) => {
  if (process.env.NODE_ENV !== 'test') return console.log(...params)
}
const errorHandler = (...params) => {
  if (process.env.NODE_ENV !== 'test') return console.error(...params)
}

module.exports = {
  infoHandler,
  errorHandler
}