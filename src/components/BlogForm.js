import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog ({
      title:newBlog,
      author:newAuthor,
      url:newUrl
    })

    setNewAuthor('')
    setNewUrl('')
    setNewBlog('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

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

    </div>
  )
}

export default BlogForm