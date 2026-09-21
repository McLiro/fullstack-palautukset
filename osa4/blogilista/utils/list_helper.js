const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)

  return total
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((favorite, blog) => {
    if (favorite === null || blog.likes > favorite.likes) return blog
    else return favorite
  }, null)

  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const counts = {}
  for (const blog of blogs) {
    counts[blog.author] = (counts[blog.author] ?? 0) + 1
  }

  let topAuthor = null
  let topCount = 0

  for (const [author, count] of Object.entries(counts)) {
    if (count > topCount) {
      topAuthor = author
      topCount = count
    }
  }

  return {
    author: topAuthor,
    blogs: topCount
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const counts = {}
  for (const blog of blogs) {
    counts[blog.author] = (counts[blog.author] ?? 0) + blog.likes
  }

  let topAuthor = null
  let topCount = 0

  for (const [author, count] of Object.entries(counts)) {
    if (count > topCount) {
      topAuthor = author
      topCount = count
    }
  }

  return {
    author: topAuthor,
    likes: topCount
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
