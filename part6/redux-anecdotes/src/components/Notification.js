import { useSelector } from 'react-redux'
import React from 'react'

const Notification = () => {
    const anecdoteNotification = useSelector(state => {

        if(state.updatevote === null) return ''
        else return `you voted '${state.updatevote}'`
    })


    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    return (
        <div style={style}>
            {anecdoteNotification}
        </div>
    )
}

export default Notification