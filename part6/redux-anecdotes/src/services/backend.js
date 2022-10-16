import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get( baseURL )

    return response.data
}

const postNew = async (newAnecdote) => {
    const response = await axios.post(baseURL,{ content: newAnecdote, votes: 0 })
    return response.data
}

export { getAll, postNew }