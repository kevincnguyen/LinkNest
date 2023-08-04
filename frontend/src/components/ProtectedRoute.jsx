// import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth()
    const location = useLocation()

    return (
        auth.user 
            ? children
            : <Navigate to='/login' state={{ from: location }} replace />
    )

    // const [loading, setLoading] = useState(true)
    // const [status, setStatus] = useState(null)

    // useEffect(() => {
    //     const getStatus = async () => {
    //         try {
    //             const res = await authService.isLoggedIn()
    //             setStatus(res)
    //         } catch (e) {
    //             setStatus(e.response.request.status)
    //         }
    //         setLoading(false)
    //     }      
    //     getStatus()
    // }, [])

    // if (loading) {
    //     return (
    //         <div>
    //             Loading...
    //         </div>
    //     )
    // }

    // if (status !== 200) {
    //     return <Navigate to='/auth/login' replace state={{ from: location }} />
    // }
    // return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node
}

export default ProtectedRoute