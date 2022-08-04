const blogroutes = require('express').Router()
const Blog = require('./../models/blogschema')

blogroutes.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogroutes.post('/', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})





module.exports = blogroutes