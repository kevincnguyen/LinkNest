import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import loginService from '../services/login'
import InvalidCredentials from '../components/InvalidCredentials'
import NoServerResponse from '../components/NoServerResponse'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()
    const { setAuth } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
                toast.error(<NoServerResponse />, {
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                toast.error(<InvalidCredentials />, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            setUsername('')
            setPassword('')
        }
    }

    return (
        <div className='relative flex flex-col justify-center'>
            <div className='w-full mt-8 p-6 m-auto bg-base-100 border rounded-md shadow-md lg:max-w-xl'>
                <h2 className='text-3xl font-semibold text-center'>
                    Log in to LinkNest
                </h2>
                <form onSubmit={handleLogin} className='form-control space-y-4'>
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
                            className='w-full input input-bordered input-secondary'
                        />
                    </div>
                    <div className='mb-8'>
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
                            className='w-full input input-bordered input-secondary'
                        />
                    </div>
                    <button type='submit' className='btn btn-block btn-secondary'>
                        Log in
                    </button>
                </form>
                <div className='text-sm mt-4'>
                    <span>Need an Account? </span>
                    <Link to='/signup' className='text-accent hover:text-accent-focus'>
                        Sign up
                    </Link>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login