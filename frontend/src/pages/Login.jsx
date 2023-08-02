import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notification from '../components/Notification'
import loginService from '../services/login'

const Login = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }
    
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await loginService.login({
                username, password
            })
            navigate('/user')
        } catch (e) {
            console.error('error: ', e)
            setMessage('Invalid credentials. Try again.')
            setUsername('')
            setPassword('')
        }
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    return (
        <div>
            <h2>Log in to your LinkNest</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type='text'
                        value={username}
                        name='Username'
                        placeholder='Username'
                        onChange={handleUsername}
                    />
                </div>
                <div>
                    <input
                        type='password'
                        value={password}
                        name='Password'
                        placeholder='Password'
                        onChange={handlePassword}
                    />
                </div>
                <button type='submit'>
                    Log in
                </button>
            </form>
            <Notification message={message} />
        </div>
    )
}

export default Login