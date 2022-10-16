import { useSelector } from 'react-redux'


const Notification = () => {
  const anecdoteNotification = useSelector(state => { 
    console.log(state.updatevote)
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