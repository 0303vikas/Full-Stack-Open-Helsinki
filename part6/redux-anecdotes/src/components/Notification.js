import {  connect } from 'react-redux'
import React from 'react'

const Notification = (props) => {



    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    return (
        <div style={style}>
            {props.message}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

        message: (state.updatevote === null
            ? ''
            : `you voted '${state.updatevote}'`
        )
    }}


export default connect(mapStateToProps)(Notification)