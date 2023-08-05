import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Dashboard = () => {
    const { auth } = useAuth()
    return (
        <div>
            <h1>Welcome to LinkNest, {auth.user.name}</h1>
            <h3>Please select a category: </h3>
            <Link to='/admin/links'>Edit links</Link>
            <br />
            <Link to='/admin/appearance'>Edit appearance</Link>
        </div>
    )
}

export default Dashboard