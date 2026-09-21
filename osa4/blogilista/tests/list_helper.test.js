const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')
const { resourceUsage } = require('node:process')

const emptyList = []

const listWithOneBlog = [{
  _id: "5a422a851b54a676234d17f7",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  __v: 0
}]

const listWithMultipleBlogs = [{
  _id: "5a422a851b54a676234d17f7",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  __v: 0
},
{
  _id: "5a422aa71b54a676234d17f8",
  title: "Go To Statement Considered Harmful",
  author: "Edsger W. Dijkstra",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes: 5,
  __v: 0
},
{
  _id: "5a422b3a1b54a676234d17f9",
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 12,
  __v: 0
},
{
  _id: "5a422b891b54a676234d17fa",
  title: "First class tests",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  likes: 10,
  __v: 0
},
{
  _id: "5a422ba71b54a676234d17fb",
  title: "TDD harms architecture",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  likes: 0,
  __v: 0
},
{
  _id: "5a422bc61b54a676234d17fc",
  title: "Type wars",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  likes: 2,
  __v: 0
}]

test('dummy returns one', () => {
  const result = dummy(emptyList)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals that', () => {
    const result = totalLikes(listWithOneBlog)
    assert.strictEqual(result, 7)
  })

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('blog with the most likes', () => {
  test('of an empty list is null', () => {
    const result = favoriteBlog(emptyList)
    assert.strictEqual(result, null)
  })

  test('of a list with one blog is that blog', () => {
    const result = favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('of a bigger list is the right blog', () => {
    const result = favoriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, listWithMultipleBlogs[2])
  })
})

describe('author with the most blogs', () => {
  test('of an empty list is null', () => {
    const result = mostBlogs(emptyList)
    assert.strictEqual(result, null)
  })

  test('of a list with one blog is the author of that blog', () => {
    const result = mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {author: "Michael Chan", blogs: 1})
  })

  test('of a bigger list is the right author and count', () => {
    const result = mostBlogs(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {author: "Robert C. Martin", blogs: 3})
  })
})

describe('author with the most likes', () => {
  test('of an empty list is null', () => {
    const result = mostLikes(emptyList)
    assert.strictEqual(result, null)
  })

  test('of a list with one blog is the author of that blog', () => {
    const result = mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {author: "Michael Chan", likes: 7})
  })

  test('of a bigger list is the right author and count', () => {
    const result = mostLikes(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {author: "Edsger W. Dijkstra", likes: 17})
  })
})
