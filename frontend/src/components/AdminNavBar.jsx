import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Notification from './Notification'
import logoutService from '../services/logout'

const AdminNavBar = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)

    const handleLogout = async (event) => {
        event.preventDefault()
        try {
            await logoutService.logout()
            navigate('/')
        } catch (e) {
            console.error('error: ', e)
            setMessage('Unable to logout. Try again.')
        }
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    return (
        <>
            <nav>
                <NavLink to='/user'>
                    <h1>LinkNest</h1>
                </NavLink>
                <ul>
                    <li><NavLink to='/user'>Dashboard</NavLink></li>
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