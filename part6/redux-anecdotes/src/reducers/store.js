import anecreducer from './anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    notifications: anecreducer
}})

export default store