import { NavLink, useNavigate } from 'react-router-dom'

import Emoji from './Emoji'
import useLogout from '../hooks/useLogout'


const AdminNavBar = () => {
    const logout = useLogout()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/')
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
                    <li>
                        <NavLink to='/admin'>
                                Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/admin/account'>
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={handleLogout}>
                            Log out
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default AdminNavBar