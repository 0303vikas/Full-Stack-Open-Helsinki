
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogroutes = require('../controllers/blogs')
const {
  blogs,
  blogsInDB,
  nonExistingId
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

describe('Testing Post api', () => {

  test('a valid blog can be added', async() => {
    const newBlog = {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    }


    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogAtEnd = await blogsInDB()

    expect(blogAtEnd).toHaveLength(blogs.length + 1)
    expect(blogAtEnd.map(n => n.author)).toContain('Edsger W. Dijkstra')
  })

  test('note without content is not added', async () => {
    const newblog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newblog)
      .expect(400)

    const blogAtEnd = await blogsInDB()

    expect(blogAtEnd).toHaveLength(blogs.length)
  })

  test('If no like value is given, it gives value to zero', async () => {
    const newblog = {
      title: 'default likes to be zero',
      author: 'vikas',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      __v: 0,
    }

    await api
      .post('/api/blogs')
      .send(newblog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogAtEnd = await blogsInDB()

    expect(blogAtEnd.map(e => e.likes)).toContain(0)
  })

  test('if title and url field doesn"t exists, res will be bar request', async () => {
    const newblog = {
      author: 'vikas',
      __v: 0,
    }

    const response = await api
      .post('/api/blogs')
      .send(newblog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.statusCode).toBe(400)
  })
})

describe('detetion of a note', () => {
  test('Succeeds with status code 204 if id is valid', async ()=> {
    const blogsAtStart = await blogsInDB()
    const blogToDelete = blogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDB()
    console.log(typeof blogsAtStart.length )

    expect(blogsAtEnd).toHaveLength( blogsAtStart.length -1)

    const contents = blogsAtEnd.map(e => e.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('Update a note with id', () => {
  test('Updating a single note with id', async () => {
    const blog = {
      title: 'Hello',
      author: 'vikas singh',
      url: 'http://localhost:3003/api/blogs',
      likes: 100
    }

    await api
      .put(`/api/blogs/${blogs[0]._id}`)
      .send(blog)
      .expect(204)

    const blogsAtEnd = await blogsInDB()

    expect(blogsAtEnd.find(e => {if(String(e.id) === '5a422a851b54a676234d17f7') return e.name})).toBe(blog.name)
  })

})

afterAll(() => {
  mongoose.connection.close()
})