const notifiReduce = (state = null, action) => {
    console.log('acction payload',action.payload)
    if(action.type === 'UPDATE_VOTE') return action.payload
    else return state
}

const notifiChange = newNotifi => {
    return{
       type: 'UPDATE_VOTE',
       payload: newNotifi
    }
}

export default notifiReduce
export {notifiChange}