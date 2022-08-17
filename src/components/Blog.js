import { useState } from 'react'

const Blog = ({ blog , handleDelete, user, likeBlog }) => {

  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeStyle ={
    backgroundColor: 'lime'
  }

  const deleteStyle = {
    backgroundColor: 'salmon'
  }

  return (
    <div>
      {showAll === false ?
        <div style = {blogStyle}>
                Content: {blog.title} <button type='show' onClick={() => setShowAll(!showAll)}>view</button>
        </div> :
        <div style={blogStyle}>
          Content: {blog.title}
          <div></div>
          Author: {blog.author}
          <div></div>
                Url: {blog.url}
          <div></div>
                Likes: {blog.likes} <button type='like' style={likeStyle} value={blog.id} name={blog.author} title={blog.likes} onClick={likeBlog}>like</button>
          <div></div>
          <button type='show' onClick={() => setShowAll(!showAll)}>hide post</button>
          <div></div>
          {!user || user.name !== blog.user.name ?
            <div></div>
            :
            <button type='delete' style={deleteStyle} value={blog.id} onClick={handleDelete}>delete post</button>
          }

        </div>
      }
    </div>
  )
}



export default Blog