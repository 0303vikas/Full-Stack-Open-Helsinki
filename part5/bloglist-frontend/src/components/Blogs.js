import { useState } from "react"
import NewBlog from "./CreateBlog"

const Blog = ({blog}) => (
    <div>
      {blog.title} {blog.author}
    </div>  
  )


const BlogsForm = ({blogs, user, userlogout}) => {

  const [addBlogFormVisibility, setAddBlogFormVisibility] = useState(false)

  const [newNoteCancelButton, setnewNoteCancelButton] = useState('New Note')

   const logUserOut = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    userlogout(null)
   }

    if(!blogs) return <h1>No blogs found.</h1>

    const blogForm = () => {
      setAddBlogFormVisibility(!addBlogFormVisibility)
      if (addBlogFormVisibility) {
        setnewNoteCancelButton('New Note')
      } else {
        setnewNoteCancelButton('Cancel')
      }
     }

    return(
        <div>
      <h1>blogs</h1>
      <div>
      <h4>{user.username} logged in  <button title="logout" onClick={logUserOut}>logout</button></h4>    
      </div>      
      {addBlogFormVisibility?<NewBlog user={user} />:null}
      <button onClick={blogForm}>{newNoteCancelButton}</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

        </div>
    )
}

export default BlogsForm;