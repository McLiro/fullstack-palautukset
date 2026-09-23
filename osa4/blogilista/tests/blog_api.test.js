const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
const assert = require('assert')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('get returns correct amount of blogs as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, 5)
})

test('ids are formed correctly', async () => {
  const response = await api
    .get('/api/blogs')

  response.body.forEach(blog => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

test('blog gets added correctly', async () => {
  await api
    .post('/api/blogs')
    .send(helper.testBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  const titles = response.body.map(b => b.title)
  assert(titles.includes('Type wars'))
})

test('blog with undefined likes gets added with zero likes', async () => {
  const noLikesBlog = {
  _id: "5a422bc61b54a676234d17fc",
  title: "Type wars",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  __v: 0
  }

  const response = await api
    .post('/api/blogs')
    .send(noLikesBlog)

  assert.strictEqual(response.body.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})
