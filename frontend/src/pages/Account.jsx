import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import usersService from '../services/users'
import Notification from '../components/Notification'
// import { useEffect } from 'react'

const Account = () => {
    // const navigate = useNavigate()
    // const location = useLocation()

    const { auth, setAuth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    // useEffect(() => {
    //     const updateUser = async () => {
    //         try {
    //             const res = await usersService.update(auth.user.id, { ...auth.user, password: 'password' }, axiosPrivate)
    //             console.log(res)
    //         } catch (error) {
    //             console.error(error)
    //             navigate('/login', { state: { from: location }, replace: true })
    //         }
            
    //     }
    //     updateUser()

    // }, [])

    const handleSave = async (event) => {
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
                const updatedUser = await usersService.update(auth.user.id, { 
                    name, username, email, password, 
                }, axiosPrivate)
                setAuth({ user: updatedUser, accessToken: auth.accessToken})
                setName('')
                setUsername('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setMessage('Account details successfully updated')
            }
        } catch (err) {
            console.error('error: ', err)
            if (!err.response) {
                setMessage('No server response')
            } else if (username !== auth.user.username
                        && email !== auth.user.email
                        && err.response.data.error.includes('username') 
                        && err.response.data.error.includes('email')) {
                setMessage('An account already exists with that username and email. Please try a different username and email.')
                setUsername('')
                setEmail('')
            } else if (username !== auth.user.username
                        && err.response.data.error.includes('username')) {
                setMessage('An account already exists with that username. Please try a different username.')
                setUsername('')
            } else if (email !== auth.user.email
                        && err.response.data.error.includes('email')) {
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
        <div>
            <h1>Account Details</h1>
            <form onSubmit={handleSave}>
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
                    onChange={(e) => setUsername(e.target.value)}
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
                    id='confirm-password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete='off'
                    required
                />
                <br />
                <button type='submit'>
                    Save
                </button>
            </form>
            <Notification message={message} />
        </div>
    )
}

export default Account