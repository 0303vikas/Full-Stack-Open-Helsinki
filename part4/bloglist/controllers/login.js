const loginrouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/userschema')
const bcrypt = require('bcrypt')
require('dotenv').config()



loginrouter.post('/', async (req, res) => {
  const { username,password } = req.body
  const userExist = await User.findOne({ username })

  const passwordCorrect = userExist === null
    ?false
    :await bcrypt.compare(password, userExist.passwordhash)

  if(!(userExist && passwordCorrect)) return res.status(401).json({ error: 'Invalid username or password' })

  const userToken = {
    username: username,
    id: userExist.id
  }

  const token = jwt.sign(userToken,process.env.SECRET_KEY, { expiresIn: 60*60 })

  res
    .status(200)
    .send({ token, username: userExist.username, name: userExist.name })
})


module.exports = loginrouter
