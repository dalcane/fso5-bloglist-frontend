import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import Footer from './components/Footer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  const descendingLikes = [...blogs].sort((a,b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setErrorMessage(`logged out ${user.name}`)
    setUser(null)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`New blog successfully added by ${user.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
      })
      .catch(error => {
        setErrorMessage(JSON.stringify(error.response.data))
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
      })
  }

  const likeBlog = (event) => {
    const idToChange = event.target.value

    const blogToChange = {
      likes: parseInt(event.target.title, 10) +1,
    }

    blogService
      .update(idToChange, blogToChange)
      .then(() => {
        setBlogs(blogs.map(p => {
          return p
        }))
      })
  }

  const handleDelete = (event) => {
    const idToDelete = event.target.value

    blogService
      .deleteBlog(idToDelete)
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
        setErrorMessage(`Deleted blog id ${idToDelete}.`)
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
      })
  }

  return (
    <div>
      <h1>BlogApp</h1>
      <Notification message={errorMessage} />

      {user === null ?
        <Toggleable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Toggleable> :
        <div>
          <p>{user.name} logged in <button type='logout' onClick={handleLogout} >logout</button></p>
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Toggleable>
        </div>
      }

      <h1>Blogs</h1>

      {descendingLikes.map(blog =>
        <Blog key={blog.id} blog={blog} handleDelete={handleDelete} user={user} likeBlog={likeBlog}/>
      )}

      <Footer />
    </div>
  )
}

export default App
