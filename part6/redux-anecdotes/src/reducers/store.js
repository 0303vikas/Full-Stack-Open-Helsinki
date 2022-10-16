import anecreducer from './anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'
import notifiReduce from './notificationReducer'

const store = configureStore({
  reducer: {
    anecmod: anecreducer,
    updatevote: notifiReduce
}})

export default store