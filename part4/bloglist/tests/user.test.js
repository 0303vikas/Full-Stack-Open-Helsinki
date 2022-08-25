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
    const user = new User({ username: 'root',name:'root', passwordhash: passwordHash })

    await user.save()
  })

  test('new user with dulicate name gives error', async () => {
    const usersAtStart = await usersInDb()
    console.log(usersAtStart)

    const newUser = {
      username: 'root',
      name: 'root',
      password: 'hisidkokd'
    }

    const result = await api
      .post('/api/users')
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

  test('If length of username is less than 3, error 400 is displayed', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'ro',
      name: 'root',
      password: 'hisidkokd'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` (`ro`) is shorter than the minimum allowed length (3)')

    const userAtEnd = await usersInDb()

    expect(userAtEnd).toHaveLength(usersAtStart.length)
  })

  test('If length of password is less than 3, error 400 is displayed', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'ro',
      name: 'root',
      password: 'hi'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    expect(result.body.error).toContain('Password should be atleast 3 character long')

    const userAtEnd = await usersInDb()

    expect(userAtEnd).toHaveLength(usersAtStart.length)
  })


})

