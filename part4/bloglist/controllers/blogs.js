const blogroutes = require('express').Router()
const Blog = require('./../models/blogschema')
const User = require('../models/userschema')

blogroutes.get('/', async (request, response) => {
  const allblogs = await Blog.find({}).populate('user',{ username: 1, name: 1})
  response.json(allblogs)

})

blogroutes.post('/', async (request, response) => {
  const user = await User.findById(request.body.userId)
  console.log(user)
  const blog = new Blog({ ...request.body, user: user.id })
  const saveblog = await blog.save()
  user.blogs = user.blogs.concat(saveblog.id)
  await user.save()
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