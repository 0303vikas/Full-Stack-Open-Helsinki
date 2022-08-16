
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogroutes = require('../controllers/blogs')
const {
  blogs,
  blogsInDB
} = require('./blogs_helpers')

const api = supertest(app)

const Blog = require('../models/blogschema')



beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

test('blogs are returned as json', async () => {

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(blogs.length)
})

test('checking if _id or id exist in db', async () => {

  const response =  await blogsInDB()

  expect(response[0].id).toBeDefined()

})

afterAll(() => {
  mongoose.connection.close()
})