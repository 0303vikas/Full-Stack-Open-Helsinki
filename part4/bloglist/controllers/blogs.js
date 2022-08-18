const blogroutes = require('express').Router()
const { response } = require('../app')
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

blogroutes.delete('/:id', async (req, res) => {
  console.log(req.params.id)
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()

})


module.exports = blogroutes