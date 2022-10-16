import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {

    const dispatch = useDispatch()  

  const addAnecdotes = (e) => {
    e.preventDefault()

    const content = e.target.anecdoteName.value
    e.target.anecdoteName.value = ''

    dispatch(createAnecdote(content))

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