import {useState} from 'react';
import { login } from '../services/login'
import ErrorMessage from './ErrorMessage'

const LoginForm = ({userlogin}) => {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[error, setErrorMessage] = useState('')
    const[errorColor, setErrorColor] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try{
            const user = await login({ 
                username, 
                password, 
              })
            
            window.localStorage.setItem(
              'loggedBlogsappUser', JSON.stringify(user)
            )
            userlogin(user)
            
        } catch (e) {
            setErrorMessage('Wrong credentials')
            setErrorColor('red')
            setTimeout(() => {setErrorMessage(null)},5000)
        }
        setUsername('')
        setPassword('')
    }



    return (
      <form onSubmit={handleLogin}>
        {error?<ErrorMessage err={error} col={errorColor} />:null}
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>  
    )    
}

    export default LoginForm;
  
   