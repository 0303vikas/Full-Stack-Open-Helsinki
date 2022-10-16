import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notifiChange } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        console.log('This is it',state)
        if(state.filterlist.value !== null){
        const regEq = RegExp(`.*${state.filterlist.value.toLowerCase().split('').join('.*')}.*`)
        return state.anecmod.slice().sort((a,b) => b.votes-a.votes).filter(anec => anec.content.toLowerCase().match(regEq)) }        
        else return state.anecmod.slice().sort((a,b) => b.votes-a.votes)
            
        
    })
    const dispatch = useDispatch()

    const vote =  (id, content) => {    
        
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