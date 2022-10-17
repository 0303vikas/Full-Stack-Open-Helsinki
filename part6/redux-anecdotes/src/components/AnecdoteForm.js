import { useDispatch } from 'react-redux'
import { setSingleAnecdote } from '../reducers/anecdoteReducer'
import React from 'react'
import { postNew } from '../services/backend'

const NewAnecdote = () => {

    const dispatch = useDispatch()

    const addAnecdotes = (e) => {
        e.preventDefault()

        const content = e.target.anecdoteName.value
        e.target.anecdoteName.value = ''
        postNew(content).then(data => dispatch(setSingleAnecdote(data)))

    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdotes}>
                <div><input type='text' name='anecdoteName' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default NewAnecdote