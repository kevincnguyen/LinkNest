import { useState } from 'react'
// import { useEffect } from 'react'
// import usersService from '../services/users'

const Account = () => {
    // const { auth } = useAuth()
    // const axiosPrivate = useAxiosPrivate()
    // const navigate = useNavigate()
    // const location = useLocation()

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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

    const handleSave = (event) => {
        event.preventDefault()
        console.log('Saving...')
    }

    return (
        <div>
            <h2>Account Details</h2>
            <form onSubmit={handleSave}>
                <label htmlFor='#name'>
                    Name: 
                    <input
                        type='text'
                        value={name}
                        id='name'
                        name='Name'
                        placeholder='Name'
                        onChange={handleName}
                    />
                </label>
                <br />
                <label htmlFor='#username'>
                    Username: 
                    <input
                        type='text'
                        value={username}
                        id='username'
                        name='Username'
                        placeholder='Username'
                        onChange={handleUsername}
                    />
                </label>
                <br />
                <label htmlFor='#email'>
                    Email:
                    <input
                        type='email'
                        value={email}
                        id='email'
                        name='Email'
                        placeholder='Email'
                        onChange={handleEmail}
                    />
                </label>
                <br />
                <label htmlFor='#password'>
                    Password:
                    <input
                        type='password'
                        value={password}
                        id='password'
                        name='Password'
                        placeholder='Password'
                        onChange={handlePassword}
                    />
                </label>
                <br />
                <label htmlFor='#confirm-password'>
                    Confirm Password:
                    <input
                        type='password'
                        value={confirmPassword}
                        id='confirm-password'
                        name='ConfirmPassword'
                        placeholder='Confirm Password'
                        onChange={handleConfirmPassword}
                    />
                </label>
                <br />
                <button type='submit'>
                    Save
                </button>
            </form>
        </div>
    )
}

export default Account