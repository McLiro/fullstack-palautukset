const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)

  return total
}

const favoriteBlog = (blogs) => {
  const total = blogs.reduce((favorite, blog) => {
    if (favorite === null || blog.likes > favorite.likes) return blog
    else return favorite
  }, null)

  return total
}

module.exports = { dummy, totalLikes, favoriteBlog }
