import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notification from '../components/Notification'
import signupService from '../services/signup'

const Signup = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }

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
                navigate('/user')
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
                        onChange={handleName}
                    />
                </div>
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
                        type='text'
                        value={email}
                        name='Email'
                        placeholder='Email'
                        onChange={handleEmail}
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
                <div>
                    <input
                        type='password'
                        value={confirmPassword}
                        name='ConfirmPassword'
                        placeholder='Confirm Password'
                        onChange={handleConfirmPassword}
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