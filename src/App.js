import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState('')


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

  const loginForm = () => (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setErrorMessage(`logged out ${user.name}`)
    setUser(null)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title:newBlog,
      author:newAuthor,
      url:newUrl
    }

    blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog('')
          setNewAuthor('')
          setNewUrl('')
        })
  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const handleAuthorChange = (event) => {
      setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
      setNewUrl(event.target.value)
  }

  const blogForm = () => (
      <form onSubmit={addBlog}>
        <div>
            Blog content: <input
            value={newBlog}
            onChange={handleBlogChange}/>
          <div></div>
            author: <input
            value={newAuthor}
            onChange={handleAuthorChange}/>
            <div></div>
            url: <input
            value={newUrl}
            onChange={handleUrlChange}/>
        </div>

        <div>
          <button type="submit">save</button>
        </div>

      </form>
  )

  return (
    <div>
      <Notification message={errorMessage} />

        {user === null ? loginForm() :
        <div>
          <p>{user.name} logged in <button type='logout' onClick={handleLogout} >logout</button></p>
          {blogForm()}
        </div>}

      <h1>Blogs</h1>

      <h2>Login</h2>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
