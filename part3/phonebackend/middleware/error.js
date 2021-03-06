const { response } = require('express')

module.exports.errorHandler = (error,req,res,next) => {

    console.error(error.message)

    if(error === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}