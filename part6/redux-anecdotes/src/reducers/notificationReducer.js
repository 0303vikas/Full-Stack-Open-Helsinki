const notifiReduce = (state = null, action) => {

    if(action.type === 'UPDATE_VOTE') return action.payload
    else return state
}

const notifiChange = newNotifi => async dispatch => {
    dispatch({
        type: 'UPDATE_VOTE',
        payload: newNotifi })
    setTimeout(() => dispatch({ type: 'UPDATE_VOTE',
        payload: null }) ,5000)
}

export default notifiReduce
export { notifiChange }