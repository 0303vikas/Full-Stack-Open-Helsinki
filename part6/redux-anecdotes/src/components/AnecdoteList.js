import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notifiChange } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        console.log('This is it',state)
        return state.anecmod.slice().sort((a,b) => b.votes-a.votes)
    })
    const dispatch = useDispatch()

    const vote =  (id, content) => {
        
        console.log(id)
        dispatch(voteAnecdote(id))
        dispatch(notifiChange(content))
        setTimeout(() => dispatch(notifiChange(null)), 5000)
    }

    return(
        <div>
             
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id,anecdote.content)}>vote</button>
                </div>
        </div>
      )}
        </div>

    )

}

export default AnecdoteList