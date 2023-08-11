import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import loginService from '../services/login'
import signupService from '../services/signup'
import NoServerResponse from '../components/messages/NoServerResponse'
import AlreadyExists from '../components/messages/AlreadyExists'
import NoMatchPasswords from '../components/messages/NoMatchPasswords'
import InvalidCredentials from '../components/messages/InvalidCredentials'

const Signup = () => {
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const { setAuth } = useAuth()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSignup = async (event) => {
        event.preventDefault()
        try {
            if (!name || !username || !email || !password || !confirmPassword) {
                toast.warn('Missing required field(s).', {
                    position: toast.POSITION.TOP_CENTER
                });
            } else if (password.length < 8 || confirmPassword.length < 8) {
                toast.warn('Password must be at least 8 characters.', {
                    position: toast.POSITION.TOP_CENTER
                });
                setPassword('')
                setConfirmPassword('')
            } else if (password !== confirmPassword) {
                toast.warn(<NoMatchPasswords />, {
                    position: toast.POSITION.TOP_CENTER
                });
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
                navigate('/admin/dashboard')
            }
        } catch (err) {
            console.error('error: ', err)
            if (!err.response) {
                toast.error(<NoServerResponse />, {
                    position: toast.POSITION.TOP_CENTER
                });
            } else if (err.response.data.error.includes('username') 
                        && err.response.data.error.includes('email')) { 
                toast.error(<AlreadyExists user={true} email={true} />, {
                    position: toast.POSITION.TOP_CENTER
                });          
                setUsername('')
                setEmail('')
            } else if (err.response.data.error.includes('username')) {
                toast.error(<AlreadyExists user={true} />, {
                    position: toast.POSITION.TOP_CENTER
                });        
                setUsername('')
            } else if (err.response.data.error.includes('email')) {
                toast.error(<AlreadyExists email={true} />, {
                    position: toast.POSITION.TOP_CENTER
                });        
                setEmail('')
            } else {
                toast.error(<InvalidCredentials />, {
                    position: toast.POSITION.TOP_CENTER
                });     
                setName('')
                setUsername('')
                setEmail('')
            }
            setPassword('')
            setConfirmPassword('')
        }
    }

    return (
        <div className='relative flex flex-col justify-center'>
            <div className='w-full mt-3 p-6 m-auto bg-base-100 border rounded-md shadow-md lg:max-w-xl'>
                <h2 className='text-3xl font-semibold text-center'>
                    Create an account 
                </h2>
                <form onSubmit={handleSignup} className='form-control space-y-2'>
                    <div>
                        <label htmlFor='name' className='label'>
                            <span className='text-base label-text'>
                                Name
                            </span>
                        </label>
                        <input
                            type='text'
                            value={name}
                            id='name'
                            name='Name'
                            onChange={(e) => setName(e.target.value)}
                            autoComplete='off'
                            required
                            className='w-full input input-bordered input-accent'
                        />
                    </div>
                    <div>
                        <label htmlFor='username' className='label'>
                            <span className='text-base label-text'>
                                Username
                            </span>
                        </label>
                        <input
                            type='text'
                            value={username}
                            id='username'
                            name='Username'
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete='off'
                            required
                            className='w-full input input-bordered input-accent'
                        />
                    </div>
                    <div>
                        <label htmlFor='email' className='label'>
                            <span className='text-base label-text'>
                                Email
                            </span>
                        </label>
                        <input
                            type='email'
                            value={email}
                            id='email'
                            name='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete='off'
                            required
                            className='w-full input input-bordered input-accent'
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='label'>
                            <span className='text-base label-text'>
                                Password
                            </span>
                        </label>
                        <input
                            type='password'
                            value={password}
                            id='password'
                            name='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete='off'
                            required
                            className='w-full input input-bordered input-accent'
                        />
                    </div>
                    <div>
                        <label htmlFor='confirmPassword' className='label'>
                            <span className='text-base label-text'>
                                Confirm Password
                            </span>
                        </label>
                        <input
                            type='password'
                            value={confirmPassword}
                            id='confirmPassword'
                            name='ConfirmPassword'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete='off'
                            required
                            className='w-full input input-bordered input-accent'
                        />
                    </div>
                    <button type='submit' className='btn btn-block btn-accent'>
                        Create account
                    </button>
                </form>
                <div className='text-sm mt-2'>
                    <span>Already have an account? </span>
                    <Link to='/login' className='text-secondary hover:text-secondary-focus'>
                        Log in
                    </Link>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Signup