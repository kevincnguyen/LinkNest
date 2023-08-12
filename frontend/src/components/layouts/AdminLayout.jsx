import { Outlet } from 'react-router-dom';
import AdminNavBar from '../nav/AdminNavBar';
import ProtectedRoute from '../ProtectedRoute';

function AdminLayout() {
  return (
    <ProtectedRoute>
      <AdminNavBar />
      <Outlet />
    </ProtectedRoute>
  );
}

export default AdminLayout;
