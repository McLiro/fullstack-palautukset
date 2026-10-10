import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const isOwner = blog.user && user && blog.user.username === user.username

  if (expanded) {
    return (
      <div style={blogStyle} data-testid="blog">
        <div>
          {blog.title} <button onClick={() => setExpanded(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          <span data-testid="likes">likes {blog.likes}</span>{' '}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>{blog.author}</div>

        {isOwner && (
          <div>
            <button onClick={() => handleDelete(blog)}>remove</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={blogStyle} data-testid="blog">
      {blog.title} <button onClick={() => setExpanded(true)}>view</button>
    </div>
  )
}

export default Blog