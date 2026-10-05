import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      notify('invalid credentials', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
    blogService.setToken(null)
  }

  const handleNewBlog = async ({ title, author, url }) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(prevBlogs => prevBlogs.concat(newBlog))
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added.`)
    } catch {
      notify('failed to create new blog', 'error')
    }
  }

  const handleLike = async (blog) => {
    const updated = await blogService.update({
      ...blog,
      likes: blog.likes + 1
    })

    setBlogs(prevBlogs =>
      prevBlogs.map(b => (b.id === updated.id ? updated : b))
    )
  }

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification?.message} type={notification?.type} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification?.message} type={notification?.type} />
      <h2>Blogs</h2>
      <div>
        {user.name} logged in.
        <button onClick={handleLogout}>log out</button>
      </div>
      <br />

      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm handleNewBlog={handleNewBlog} />
      </Togglable>

      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      )}
    </div>
  )
}

export default App
