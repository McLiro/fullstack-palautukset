const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

const validatePassword = password => {
  if (!password) {return { status: 400, message: 'password required.' }}
  if (password.length < 3) { return { status: 400, message: 'password must be longer than 3 characters.' }}

  return null
}

const validateUsername = async (username) => {
  if (!username) {return { status: 400, message: 'username required.' }}
  if (username.length < 3) { return { status: 400, message: 'username must be longer than 3 charachters.' }}

  const existing = await User.findOne({ username })
  if (existing) { return { status: 409, message: 'username must be unique.' }}

  return null
}

usersRouter.post('', async (request, response) => {
  const { username, name, password } = request.body

  const pErr = validatePassword(password)
  if (pErr) {
    return response.status(pErr.status).json({ error: pErr.message })
  }

  const uErr = await validateUsername(username)
  if (uErr) {
    return response.status(uErr.status).json({ error: uErr.message })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
