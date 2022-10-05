import {  useState  } from 'react'
import { login } from '../services/login'
import ErrorMessage from './ErrorMessage'
import PropTypes from 'prop-types'

const LoginForm = ({  userlogin }) => {
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
        <form id='login_form' onSubmit={handleLogin}>
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
            <button id="login_button" type="submit">login</button>
        </form>
    )
}

LoginForm.propTypes = {
    userlogin: PropTypes.func.isRequired
}

export default LoginForm