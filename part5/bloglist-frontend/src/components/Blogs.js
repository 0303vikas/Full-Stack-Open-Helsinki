const Blog = ({blog}) => (
    <div>
      {blog.title} {blog.author}
    </div>  
  )


const BlogsForm = ({blogs, username}) => {

    if(!blogs) return <h1>No blogs found.</h1>

    return(
        <div>
      <h2>blogs</h2>
      <h3>{username} logged in </h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

        </div>
    )
}

export default BlogsForm;