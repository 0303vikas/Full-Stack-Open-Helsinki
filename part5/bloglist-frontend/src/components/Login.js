import {useState} from 'react';
import { login } from '../services/login'
import ErrorMessage from './ErrorMessage'

const LoginForm = ({userlogin}) => {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[error, setErrorMessage] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try{
            const user = await login({ 
                username, password })

            userlogin(user)
            setUsername('')
            setPassword('')
        } catch (e) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {setErrorMessage(null)},5000)
        }
    }



    return (
      <form onSubmit={handleLogin}>
        {error?<ErrorMessage err={error} />:null}
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
  
   