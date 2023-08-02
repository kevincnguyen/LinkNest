import { Outlet } from 'react-router-dom'

import AdminNavBar from "../components/AdminNavBar"

const AdminLayout = () => {
    return (
        <>
            <AdminNavBar />
            <Outlet />
        </>
    )
}

export default AdminLayout