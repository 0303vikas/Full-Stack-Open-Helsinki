const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/userschema')
const supertest = require('supertest')
const app = require('../app')

const { usersInDb } = require('./blogs_helpers')


const api = supertest(app)


describe('User testing', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root',name:'root', passwordHash })

    await user.save()
  })

  test('new user with dulicate name gives error', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'root',
      password: 'hisidkokd'
    }

    const result = await api
      .post(newUser)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    expect(result.body.error).toContain('username must be unique')



  })


  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'Vikas',
      name: 'VikasSingh',
      password: 'hsisksidkd'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const userAtEnd = await usersInDb()

    expect(userAtEnd).toHaveLength(usersAtStart.length + 1)

    expect(userAtEnd.map(u => u.username)).toContain(newUser.username)
  })
})

