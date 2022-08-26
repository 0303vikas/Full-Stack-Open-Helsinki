const blogroutes = require('express').Router()
const Blog = require('./../models/blogschema')
const User = require('../models/userschema')
const jwt = require('jsonwebtoken')
require('dotenv').config()


//decode token
const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) return authorization.substring(7)
  return null
}

blogroutes.get('/', async (request, response) => {
  const allblogs = await Blog.find({}).populate('user',{ username: 1, name: 1 })
  response.json(allblogs)

})

blogroutes.post('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodeToken = jwt.verify(token, process.env.SECRET_KEY)
  if(!decodeToken.id) return response.status(401).json({ error: 'token missing or invalid' })

  const user = await User.findById(decodeToken.id)

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