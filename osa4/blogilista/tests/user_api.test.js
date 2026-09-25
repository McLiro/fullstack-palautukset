const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const User = require('../models/user')
const app = require('../app')
const assert = require('assert')
const bcrypt = require('bcryptjs')

const api = supertest(app)

const hashAll = users =>
  Promise.all(users.map(async u => ({ ...u, passwordHash: await bcrypt.hash(u.passwordHash, 10) })))

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(await hashAll(helper.initialUsers))
})

test('user is correctly added', async () => {
  await api
    .post('/api/users')
    .send(helper.testUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/users')

  assert.strictEqual(response.body.length, helper.initialUsers.length + 1)
})

test('user with inadequate username is not created', async () => {
  const shortUser = {
    "username": "ap",
    "name": "Arttu Pelto",
    "password": "testtest"
  }

  await api
    .post('/api/users')
    .send(shortUser)
    .expect(400)

  const response = await api
    .get('/api/users')

  assert.strictEqual(response.body.length, helper.initialUsers.length)
})

test('user with inadequate password is not created', async () => {
  const shortUser = {
    "username": "ap123",
    "name": "Arttu Pelto",
    "password": "00"
  }

  await api
    .post('/api/users')
    .send(shortUser)
    .expect(400)

  const response = await api
    .get('/api/users')

  assert.strictEqual(response.body.length, helper.initialUsers.length)
})

test('user with a non-unique username is not created', async () => {
  const duplicateUser = {
    "username": "Joulupukki",
    "name": "Arttu Pelto",
    "password": "12345"
  }

  await api
    .post('/api/users')
    .send(duplicateUser)
    .expect(409)

  const response = await api
    .get('/api/users')

  assert.strictEqual(response.body.length, helper.initialUsers.length)
})

after(async () => {
  await mongoose.connection.close()
})
