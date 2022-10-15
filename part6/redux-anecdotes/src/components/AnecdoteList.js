import { useSelector, useDispatch } from 'react-redux'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log(id)
        dispatch({ type: 'vote', payload: id})
        console.log('this is working')
      }

    return(
        <div>
             
            {anecdotes.notifications.sort((a,b) => b.votes-a.votes).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
        </div>
      )}
        </div>

    )

}

export default AnecdoteList