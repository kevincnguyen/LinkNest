import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import loginService from '../services/login'
import Notification from '../components/Notification'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()
    const { setAuth } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const { user, accessToken } = await loginService.login({
                username, password
            }, axiosPrivate)
            setAuth({ user, accessToken })
            setUsername('')
            setPassword('')
            const origin = location.state?.from?.pathname || '/admin'
            navigate(origin, { replace: true })
        } catch (err) {
            console.error('error: ', err)
            if (!err.response) {
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
        <>
            <div>
                <h1>Log in to LinkNest</h1>
                <form onSubmit={handleLogin}>
                    <label htmlFor='username'>Username:</label>
                    <input
                        type='text'
                        value={username}
                        id='username'
                        name='Username'
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete='off'
                        required
                    />
                    <br />
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        value={password}
                        id='password'
                        name='Password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='off'
                        required
                    />
                    <br />
                    <button type='submit'>
                        Log in
                    </button>
                </form>
                <Notification message={message} />
            </div>
            <br />
            <div>
                <span>Need an Account? </span>
                <Link to='/signup'>Sign up</Link>
            </div>
        </>
    )
}

export default Login