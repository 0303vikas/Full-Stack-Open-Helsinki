import { createSlice } from '@reduxjs/toolkit'


const filterSlice = createSlice({
    name:'filter',
    initialState: {
        value: null },
    reducers: {
        filterWithWord: (state, action) => {

            return { ...state, value: action.payload }
        }
    }
})


export const { filterWithWord } = filterSlice.actions
export default filterSlice.reducer

