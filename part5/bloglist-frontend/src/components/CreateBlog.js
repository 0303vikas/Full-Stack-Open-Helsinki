import { useState } from 'react'
import { postBlog } from '../services/blogs'
import ErrorMessage from './ErrorMessage'


const NewBlog = ({ user, blogUpdate }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [like, setLikes] = useState(0)
    const [error, setErrorMessage] = useState('')
    const [errorColor, setErrorColor] = useState('')

    const addNewNote = async (e) => {
        e.preventDefault()

        try{
            const blog = {
                'title': title,
                'author': author,
                'url': url,
                'likes': like,
            }

            const saveblog = await postBlog(user,blog)

            console.log(saveblog)
            setAuthor('')
            setTitle('')
            setUrl('')
            setLikes(0)
            blogUpdate()
            setErrorMessage('Blog successfully save')
            setErrorColor('green')
            setTimeout(() => {setErrorMessage(null)},5000)

        } catch (err) {
            setErrorMessage(err.response.data.error)
            setErrorColor('red')
            setTimeout(() => {setErrorMessage(null)},5000)

        }

    }

    return(
        <>
            <h2>Create New Blog</h2>
            {error?<ErrorMessage err={error} col={errorColor} />:null}
            <form id='new_blog_form' onSubmit={addNewNote}>
                title:<input id='new_blog_form_title' type='text' value={title} name='Book title' onChange={({ target }) => setTitle(target.value)}/><br />
                author:<input id='new_blog_form_author' type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)}/><br />
                url:<input id='new_blog_form_url' type='url' value={url} name='Url of the book' onChange={({ target }) => setUrl(target.value)}/><br />
                likes:<input id='new_blog_form_likes' type='number' value={like} name='Number of Likes' onChange={({ target }) => setLikes(target.value)}/><br />
                <button id='new_blog_form_submit' type='submit'>Create</button>
            </form>
        </>
    )
}

export default NewBlog

