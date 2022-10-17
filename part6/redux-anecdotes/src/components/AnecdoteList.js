import { useSelector, useDispatch } from 'react-redux'
import {  saveNewVotes } from '../reducers/anecdoteReducer'
import { notifiChange } from '../reducers/notificationReducer'
import React from 'react'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        console.log('This is it',state)
        if(state.filterlist.value !== null){
            const regEq = RegExp(`.*${state.filterlist.value.toLowerCase().split('').join('.*')}.*`)
            return state.anecmod.slice().sort((a,b) => b.votes-a.votes).filter(anec => anec.content.toLowerCase().match(regEq)) }
        else return state.anecmod.slice().sort((a,b) => b.votes-a.votes)
    })
    const dispatch = useDispatch()

    const vote =  (anecdote) => {
        dispatch(saveNewVotes({ ...anecdote, votes: anecdote.votes + 1 }))
        dispatch(notifiChange(anecdote.content))
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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>

    )

}

export default AnecdoteList