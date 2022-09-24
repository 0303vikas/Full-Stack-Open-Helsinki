const ErrorMessage = ({ err,col }) => {
    if(!err) return null

    return(
        <div className='errormessage' style={{ color: col, padding: '5px', border: `2px solid ${col}` }}>{err}</div>
    )
}

export default ErrorMessage