import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log(id)
    dispatch({ type: 'vote', payload: id})
  }

  const addAnecdotes = (e) => {
    e.preventDefault()

    const content = e.target.anecdoteName.value
    e.target.anecdoteName.value = ''

    dispatch({
      type: 'save',
      data: content
    })

  }

  

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.notifications.map(anecdote =>
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
      <h2>create new</h2>
      <form onSubmit={addAnecdotes}>
        <div><input type='text' name='anecdoteName' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App