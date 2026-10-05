import { useState } from 'react'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (expanded) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} <button onClick={() => setExpanded(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button>like</button></div>
        <div>{blog.author}</div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setExpanded(true)}>view</button>
    </div>
  )
}

export default Blog
