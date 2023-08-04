import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Notification from '../components/Notification'
import loginService from '../services/login'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { setAuth } = useAuth()
    const [message, setMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const axiosPrivate = useAxiosPrivate()
    
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const { user, accessToken } = await loginService.login({
                username, password
            }, axiosPrivate)
            console.log(accessToken)
            setAuth({ user, accessToken })
            setUsername('')
            setPassword('')
            const origin = location.state?.from?.pathname || '/admin'
            navigate(origin, { replace: true })
        } catch (error) {
            if (!error.response) {
                setMessage('No server response')
            } else {
                setMessage('Invalid username or password. Please try again.')
            }
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
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type='password'
                        value={password}
                        name='Password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
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