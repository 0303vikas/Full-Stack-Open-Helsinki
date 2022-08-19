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
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()

})

blogroutes.put('/:id', async (req,res) => {
  console.log(req.body)
 
  const updateblog = await Blog.findByIdAndUpdate(req.params.id,req.body,{ new: true })
  res.status(204).json(updateblog)
})


module.exports = blogroutes