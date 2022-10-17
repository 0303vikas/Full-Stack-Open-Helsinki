import { useDispatch } from 'react-redux'
import NewAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useEffect } from 'react'
import { saveAnecdotes } from './reducers/anecdoteReducer'
import React from 'react'


const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(saveAnecdotes())
    },[dispatch])



    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <NewAnecdote />
            <Filter />
            <AnecdoteList />
        </div>
    )
}

export default App