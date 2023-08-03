import { Link } from 'react-router-dom'

const Dashboard = () => {
    const username = 'TEST'

    // if NOT logged in, redirect to login

    return (
        <div>
            <h1>Welcome to LinkNest, {username}</h1>
            <h3>Please select a category: </h3>
            <Link to='/admin/edit'>Edit your LinkNest</Link>
            <Link to='/admin/account'>Edit your profile</Link>
        </div>
    )
}

export default Dashboard