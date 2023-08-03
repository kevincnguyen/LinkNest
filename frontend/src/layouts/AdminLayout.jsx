import { Outlet } from 'react-router-dom'

import AdminNavBar from "../components/AdminNavBar"
import PrivateRoute from '../authentication/PrivateRoute'

const AdminLayout = () => {
    return (
        <PrivateRoute>
            <AdminNavBar />
            <Outlet />
        </PrivateRoute>
    )
}

export default AdminLayout