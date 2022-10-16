import anecreducer from './anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    anecmod: anecreducer
}})

export default store