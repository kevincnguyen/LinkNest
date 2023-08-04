import { Outlet } from 'react-router-dom'

import AdminNavBar from "../components/AdminNavBar"
import ProtectedRoute from '../components/ProtectedRoute'

const AdminLayout = () => {
    return (
        <ProtectedRoute>
            <AdminNavBar />
            <Outlet />
        </ProtectedRoute>
    )
}

export default AdminLayout