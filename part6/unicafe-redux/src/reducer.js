const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: initialState.good + 1}
    case 'OK':
      return { ...state, good: initialState.ok + 1}
    case 'BAD':
      return { ...state, good: initialState.bad + 1}
    case 'ZERO':
      return state
    default: return state
  }
  
}

export default counterReducer