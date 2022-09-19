const Blog = ({blog}) => (
    <div>
      {blog.title} {blog.author}
    </div>  
  )


const BlogsForm = ({blogs, username, userlogout}) => {

   const logUserOut = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    userlogout(null)
   }

    if(!blogs) return <h1>No blogs found.</h1>

    return(
        <div>
      <h2>blogs</h2>
      <div>
      <h3>{username} logged in  <button title="logout" onClick={logUserOut}>logout</button></h3>
    
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

        </div>
    )
}

export default BlogsForm;