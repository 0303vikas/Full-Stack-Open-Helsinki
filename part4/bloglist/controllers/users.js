const bcrypt = require('bcrypt')
const userroutes = require('express').Router()
const User = require('../models/userschema')


userroutes.get('/', async (req,res) => {
  const getuser = await User.find({})
  res.status(200).json(getuser)
})

userroutes.post('/', async (req, res) => {
  const { username,name,password } = req.body
 console.log(username, name, password)
  const findusr = await User.findOne({ username })

  if(findusr) {
    return res.status(400).json({
      error: 'username must be unique'
    })
  }

  const passwordhash = await bcrypt.hash(password, 10)

  const usr = new User({
    username,
    name,
    passwordhash
  })

  const saveusr = await usr.save()

  res.status(201).json(saveusr)
})

module.exports = userroutes