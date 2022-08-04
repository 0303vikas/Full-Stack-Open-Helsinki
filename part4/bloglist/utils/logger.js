const infoHandler = (...params) => console.log(...params)
const errorHandler = (...params) => console.error(...params)

module.exports = {
  infoHandler,
  errorHandler
}