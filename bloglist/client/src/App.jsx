import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import ErrorBoundary from './components/ErrorBoundary'
import { useNotify } from './hooks'

const App = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(() => {
    const UserJSON = window.localStorage.getItem('loggedBlogListUser')
    return UserJSON ? JSON.parse(UserJSON) : null
  })
  const { notify } = useNotify()

  useEffect(() => {
    (async () => {
      try {
        const fetchedBlogs = await blogService.getAll()
        if (fetchedBlogs)
          setBlogs(fetchedBlogs.sort((a, b) => b.likes - a.likes))
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
        notify(error)
      }
    })()
  }, [])

  useEffect(() => {
    blogService.setToken(user ? user.token : null)
  }, [user])

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)

      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      navigate('/')
      return true
    } catch {
      notify('wrong credentials')
      return false
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogListUser')
    setUser(null)
    blogService.setToken(null)
    navigate('/')
  }

  const addLike = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      if (updatedBlog) {
        setBlogs(
          blogs
            .map((blog) => (blog.id === blogObject.id ? updatedBlog : blog))
            .sort((a, b) => b.likes - a.likes),
        )
      }
      return true
    } catch {
      notify('adding like failed')
      return false
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      if (returnedBlog) setBlogs(blogs.concat(returnedBlog))
      navigate('/')
      return true
    } catch {
      notify('creating blog failed')
      return false
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      navigate('/')
      return true
    } catch {
      notify('deleting blog failed')
      return false
    }
  }

  return (
    <div>
      <Notification />
      <Menu user={user} handleLogout={handleLogout} />
      <ErrorBoundary>
        <Container sx={{ paddingTop: 2, paddingBottom: 4 }}>
          <Routes>
            <Route path='/' element={<BlogList blogs={blogs} />} />
            <Route path='/login' element={
              <LoginForm user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
            } />
            <Route path='/create' element={<BlogForm addBlog={addBlog} />} />
            <Route path='/blogs/:id' element={
              <BlogView
                blogs={blogs}
                addLike={addLike}
                removeBlog={removeBlog}
                user={user}
              />
            } />
            <Route path='*' element={<h2>404 – Page not found</h2>} />
          </Routes>
        </Container>
      </ErrorBoundary>
    </div>
  )
}

export default App
