import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import Emoji from './Emoji'
import Notification from './Notification'
import logoutService from '../services/logout'
import useAuth from '../hooks/useAuth'

const AdminNavBar = () => {
    const navigate = useNavigate()
    const { setAuth } = useAuth()
    const [message, setMessage] = useState(null)

    const handleLogout = async (event) => {
        event.preventDefault()
        try {
            await logoutService.logout()
            setAuth({})
            navigate('/')
        } catch (e) {
            console.error('error: ', e)
            setMessage('Unable to logout. Please try again.')
        }
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    return (
        <>
            <nav>
                <div>
                    <NavLink to='/admin'>
                        <h1>
                            <Emoji symbol='🪹' label='nest' />
                            LinkNest
                        </h1>
                    </NavLink>
                </div>
                <ul>
                    <li><NavLink to='/admin'>Dashboard</NavLink></li>
                    <li>
                        <button onClick={handleLogout}>
                            Log out
                        </button>
                    </li>
                </ul>
            </nav>
            <Notification message={message} />
        </>
    )
}

export default AdminNavBar