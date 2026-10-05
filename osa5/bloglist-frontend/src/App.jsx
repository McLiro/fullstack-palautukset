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
      setBlogs(blogs.concat(newBlog))
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added.`)
    } catch {
      notify('failed to create new blog', 'error')
    }
  }

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const blogFormRef = useRef()

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

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
