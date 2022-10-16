import { useSelector, useDispatch } from 'react-redux'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        console.log('This is it',state)
        return state.notifications.sort((a,b) => b.votes-a.votes)
    })
    const dispatch = useDispatch()

    const vote =  (id) => {
        
        console.log(id)
        dispatch({ type: 'vote', payload: id})
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
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
        </div>
      )}
        </div>

    )

}

export default AnecdoteList