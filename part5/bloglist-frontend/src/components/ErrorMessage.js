const ErrorMessage = ({err,col})=> {
    if(!err) return null
  
    return(
     <div className='errormessage' style={{color: col}}>{err}</div>
    )
  }

export default ErrorMessage