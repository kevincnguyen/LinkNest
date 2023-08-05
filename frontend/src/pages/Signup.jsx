import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import loginService from '../services/login'
import signupService from '../services/signup'
import Notification from '../components/Notification'


const Signup = () => {
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const { setAuth } = useAuth()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const handleSignup = async (event) => {
        event.preventDefault()
        try {
            if (!name || !username || !email || !password || !confirmPassword) {
                setMessage('Missing required field(s)')
            } else if (password.length < 8 || confirmPassword.length < 8) {
                setMessage('Password must be at least 8 characters')
                setPassword('')
                setConfirmPassword('')
            } else if (password !== confirmPassword) {
                setMessage('Passwords do not match. Try again.')
                setPassword('')
                setConfirmPassword('')
            } else {
                await signupService.signup({
                    name, username, email, password
                })
                const { user, accessToken } = await loginService.login({
                    username, password
                }, axiosPrivate)
                setAuth({ user, accessToken })
                navigate('/admin')
            }
        } catch (err) {
            console.error('error: ', err)
            if (!err.response) {
                setMessage('No server response')
            } else if (err.response.data.error.includes('username') 
                        && err.response.data.error.includes('email')) {
                setMessage('An account already exists with that username and email. Please try a different username and email.')
                setUsername('')
                setEmail('')
            } else if (err.response.data.error.includes('username')) {
                setMessage('An account already exists with that username. Please try a different username.')
                setUsername('')
            } else if (err.response.data.error.includes('email')) {
                setMessage('An account already exists with that email. Please try a different email.')
                setEmail('')
            } else {
                setMessage('Invalid credentials. Please try again.')
                setName('')
                setUsername('')
                setEmail('')
            }
            setPassword('')
            setConfirmPassword('')
        }
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    return (
        <>
            <div>
                <h1>Create your account</h1>
                <form onSubmit={handleSignup}>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type='text'
                        value={name}
                        id='name'
                        name='Name'
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                        autoComplete='off'
                        required
                    />
                    <br />
                    <label htmlFor='username'>Username:</label>
                    <input
                        type='text'
                        value={username}
                        id='username'
                        name='Username'
                        placeholder='Username'
                        onChange={(e) => setName(e.target.value)}
                        autoComplete='off'
                        required
                    />
                    <br />
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        value={email}
                        id='email'
                        name='Email'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
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
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input
                        type='password'
                        value={confirmPassword}
                        id='confirmPassword'
                        name='ConfirmPassword'
                        placeholder='Confirm Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete='off'
                        required
                    />
                    <br />
                    <button type='submit'>
                        Create account
                    </button>
                </form>
                <Notification message={message} />
            </div>
            <br />
            <div>
                <span>Already have an account? </span>
                <Link to='/signup'>Log in</Link>
            </div>
        </>
    )
}

export default Signup