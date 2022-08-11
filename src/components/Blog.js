import {useState} from "react";

const Blog = ({blog}) => {
    const [showAll, setShowAll] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div>
        {
            showAll === false ?
            <div style = {blogStyle}>
                Content: {blog.title} <button type='show' onClick={()=>setShowAll(!showAll)}>view</button>
            </div> :
            <div>
    Author: {blog.author}
    <div></div>
    Url: {blog.url}
    <div></div>
    Likes: {blog.likes} <button type='like'>like</button>
    <div></div>
                <button type='show' onClick={()=>setShowAll(!showAll)}>hide</button>
            </div>
        }
</div>
    )
}



export default Blog