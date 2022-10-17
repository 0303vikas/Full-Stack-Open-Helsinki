import { createSlice } from '@reduxjs/toolkit'
import { postNew, getAll, updateVote  } from '../services/backend'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const reducerSlice = createSlice({
    name:'anecdotes',
    initialState: [],
    reducers: {
        voteAnecdote: (state, action) => {
            const id = action.payload
            const anecToChange = state.find(n => n.id === id)

            const changedNote = {
                ...anecToChange,
                votes: anecToChange.votes + 1
            }
            return state.map(note =>
                note.id !== id? note : changedNote)
        },
        createAnecdote: (state, action) => {
            const content = action.payload
            const newAnec = asObject(content)

            return [...state, newAnec]
        },
        setSingleAnecdote: (state,action) => {
            state.push(action.payload)
        },
        setAnecdotes: (state,action) => {
            return action.payload
        },
        updateVotes: (state, action) => {
            return state.map(note =>
                note.id !== action.payload.id? note : action.payload)
        }
    }

})


export const { voteAnecdote, createAnecdote, setAnecdotes, setSingleAnecdote, updateVotes } = reducerSlice.actions
export const saveAnecdotes = () => async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
}

export const saveNewAnecdote = content => async dispatch => {
    const anecdote = await postNew(content)
    dispatch(setSingleAnecdote(anecdote))
}

export const saveNewVotes = content => async dispatch => {
    const anecdote = await updateVote(content)
    dispatch(updateVotes(anecdote))
}

export default reducerSlice.reducer

