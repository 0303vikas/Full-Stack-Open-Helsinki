import { useState } from 'react'
import { postBlog } from '../services/blogs'
import ErrorMessage from './ErrorMessage'


const NewBlog = ({ user }) => {
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
            <form onSubmit={addNewNote}>
                title:<input type='text' value={title} name='Book title' onChange={({ target }) => setTitle(target.value)}/><br />
                author:<input type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)}/><br />
                url:<input type='url' value={url} name='Url of the book' onChange={({ target }) => setUrl(target.value)}/><br />
                likes:<input type='number' value={like} name='Number of Likes' onChange={({ target }) => setLikes(target.value)}/><br />
                <button type='submit'>Create</button>
            </form>
        </>
    )
}

export default NewBlog

