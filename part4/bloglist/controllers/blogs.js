const blogroutes = require('express').Router()
const Blog = require('./../models/blogschema')

blogroutes.get('/', async (request, response) => {
  const allblogs = await Blog.find({})
  response.json(allblogs)

})

blogroutes.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const saveblog = await blog.save()
  response.status(201).json(saveblog)
})


module.exports = blogroutes