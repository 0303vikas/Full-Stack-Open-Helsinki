const blogroutes = require('express').Router()
const Blog = require('./../models/blogschema')
const User = require('../models/userschema')
const {userExtractor} = require('../utils/middleware')
require('dotenv').config()

blogroutes.get('/', async (request, res) => {
  const allblogs = await Blog.find({}).populate('user',{ username: 1, name: 1 })
  res.json(allblogs)

})

blogroutes.post('/',  async (req, res) => {


  if(!req.user.id) return res.status(401).json({ error: 'token missing or invalid' })

  const user = await User.findById(req.user.id)


  const blog = new Blog({ ...req.body, user: user.id })
  const saveblog = await blog.save()
  user.blogs = user.blogs.concat(saveblog.id)
  await user.save()
  res.status(201).json(saveblog)
})

blogroutes.delete('/:id', async (req, res) => {
 
  if(!req.user.id) return res.status(401).json({ error: 'token missing or invalid' })

  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() === req.user.id.toString()) {
    await Blog.findByIdAndDelete(blog.id)
    res.status(204).end()
  } else return res.status(400).json({ error: 'user doesn\'t have rights to delete the blog' })

})

blogroutes.put('/:id', async (req,res) => {
  console.log(req.body)
  const updateblog = await Blog.findByIdAndUpdate(req.params.id,req.body,{ new: true })
  res.status(204).json(updateblog)
})


module.exports = blogroutes