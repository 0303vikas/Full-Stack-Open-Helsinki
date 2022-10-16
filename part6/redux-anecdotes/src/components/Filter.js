import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterWithWord } from '../reducers/filterReducer'
import React from 'react'

const Filter = () => {
    const [filterinput, setFilterInput] = useState('')
    const dispatch = useDispatch()
    const handleChange = (e) => {
        e.preventDefault()
        setFilterInput(e.target.value)
        dispatch(filterWithWord(e.target.value))

    }
    const style = {
        marginBottom: 10,
        marginTop: 10

    }

    return (
        <div style={style}>
          filter <input type='text' value={filterinput} onChange={handleChange} />
        </div>
    )
}

export default Filter