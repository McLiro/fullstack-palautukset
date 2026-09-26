const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
  const { title, author, url, likes } = request.body

  const user = await User.findOne({})

  if (!title || !url) {
    return response.status(400).json({ error: 'title and url are required' })
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const deleted = await Blog.findByIdAndDelete(request.params.id)

  if (!deleted) {return response.status(404).end()}

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes }
  )

  if (!updatedBlog) {return response.status(404).end()}

  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
