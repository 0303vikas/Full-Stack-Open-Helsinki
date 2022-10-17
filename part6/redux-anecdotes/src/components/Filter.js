import { useState } from 'react'
import { connect } from 'react-redux'
import { filterWithWord } from '../reducers/filterReducer'
import React from 'react'

const Filter = (props) => {
    const [filterinput, setFilterInput] = useState('')

    const handleChange = (e) => {
        e.preventDefault()
        setFilterInput(e.target.value)
        props.filterWithWord(e.target.value)

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



const mapDispatchToProps = {
    filterWithWord,
}

export default connect(null, mapDispatchToProps)(Filter)