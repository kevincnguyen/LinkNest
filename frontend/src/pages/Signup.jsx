import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Notification from '../components/Notification'
import signupService from '../services/signup'
import loginService from '../services/login'
import useAuth from '../hooks/useAuth'

const Signup = () => {
    const navigate = useNavigate()
    const { setAuth } = useAuth()
    const [message, setMessage] = useState(null)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
                const { accessToken } = await loginService.login({
                    username, password
                })
                setAuth(username, accessToken)
                navigate('/admin')
            }
        } catch (e) {
            console.error('error: ', e)
            if (e.response.data.error.includes('username') && e.response.data.error.includes('email')) {
                setMessage('Account already exists with username and email. Try a different username and email.')
            } else if (e.response.data.error.includes('username')) {
                setMessage('Account already exists with username. Try a different username.')
            } else if (e.response.data.error.includes('email')) {
                setMessage('Account already exists with email. Try a different email.')
            } else {
                setMessage('Invalid credentials. Try again.')
            }
            setName('')
            setUsername('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        }
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    return (
        <div>
            <h2>Create your account</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <input
                        type='text'
                        value={name}
                        name='Name'
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type='text'
                        value={username}
                        name='Username'
                        placeholder='Username'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type='email'
                        value={email}
                        name='Email'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
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
                <div>
                    <input
                        type='password'
                        value={confirmPassword}
                        name='ConfirmPassword'
                        placeholder='Confirm Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>
                    Create account
                </button>
            </form>
            <Notification message={message} />
        </div>
    )
}

export default Signup