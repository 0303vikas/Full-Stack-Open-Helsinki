import { useState } from "react"
import NewBlog from "./CreateBlog"
import {addLikes} from '../services/blogs'

const Blog = ({blog,user,blogUpdate}) => {

  const [blogView,setBlogView] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const changeBlogView = () => {
    setBlogView(!blogView)
    if(blogView) return setButtonText('view')
    else setButtonText('hide')
  }

  const likeBlog = async () => {

    const blogSyntax = {
     title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
  }


    const updatedblogs = await addLikes(blog.id,blogSyntax,user.token)
    console.log(updatedblogs)

    blogUpdate()


  }

    return (
    <div style={{border:'black 2px solid',marginBottom: '5px', padding: '1px'}}>
       {blog.title +' '}       
       <button onClick={changeBlogView}>{buttonText}</button>
       
       {blogView ?
       (<div>
        <p>{blog.url}</p>
        <span>{'Likes  ' + blog.likes +' '}<button onClick={likeBlog}>like</button></span>
        <p>{blog.author}</p>
       </div>) : 
       null
       }
       
      
      
    </div>  
)}


const BlogsForm = ({blogs, user, userlogout, blogUpdate}) => {

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
        <Blog key={blog.id} blog={blog} user={user} blogUpdate={blogUpdate}/>
      )}

        </div>
    )
}

export default BlogsForm;