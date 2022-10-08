import { useState } from 'react'
import NewBlog from './CreateBlog'
import { addLikes,deleteBlog } from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog,user,blogUpdate }) => {

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

    const removeBlog = async () => {

        if(window.confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)){
            const blogdel = await deleteBlog(blog.id,user.token)
            console.log(blogdel)

            blogUpdate()
        }

    }

    return (
        <div style={{ border:'black 2px solid',marginBottom: '5px', padding: '1px' }}>
            {blog.title +' '}
            <button onClick={changeBlogView}>{buttonText}</button>

            {blogView ?
                (<div className='blog'>
                    <p>{blog.url}</p>
                    <span>{'Likes  ' + blog.likes +' '}<button onClick={likeBlog}>like</button></span>
                    <p>{blog.author}</p>
                    <button onClick={removeBlog}>remove</button>
                </div>) :
                null
            }
        </div>
    )}


const BlogsForm = ({ blogs, user, userlogout, blogUpdate }) => {

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
        <div id='bloglist'>
            <h1>blogs</h1>
            <div>
                <h4>{user.username} logged in  <button id='logout_button' title='logout' onClick={logUserOut}>logout</button></h4>
            </div>
            {addBlogFormVisibility?<NewBlog user={user} blogUpdate={blogUpdate} />:null}
            <button id='noteform_show_cancel_button' onClick={blogForm}>{newNoteCancelButton}</button>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={user} blogUpdate={blogUpdate}/>
            )}

        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    blogUpdate:  PropTypes.func.isRequired

}

BlogsForm.propTypes = {
    blogs: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    userlogout: PropTypes.func.isRequired,
    blogUpdate: PropTypes.func.isRequired
}

export default BlogsForm
export { Blog }