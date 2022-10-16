import anecreducer from './anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'
import notifiReduce from './notificationReducer'
import filterSlice from './filterReducer'

const store = configureStore({
  reducer: {
    anecmod: anecreducer,
    updatevote: notifiReduce,
    filterlist: filterSlice,
}})

export default store