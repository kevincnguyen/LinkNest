import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import authService from '../services/auth'

const PrivateRoute = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const getStatus = async () => {
            try {
                const res = await authService.authorize()
                setStatus(res)
            } catch (e) {
                setStatus(e.response.request.status)
            }
            setLoading(false)
        }      
        getStatus()
    }, [])

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (status !== 200) {
        return <Navigate to='/auth/login' replace />
    }
    return children
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
}

export default PrivateRoute