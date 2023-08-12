import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoute({ children }) {
  const { auth } = useAuth();
  const location = useLocation();

  return auth.user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
