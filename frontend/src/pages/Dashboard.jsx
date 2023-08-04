import { Link } from 'react-router-dom'

const Dashboard = () => {
    const user = 'TEST'

    return (
        <div>
            <h1>Welcome to LinkNest, {user}</h1>
            <h3>Please select a category: </h3>
            <Link to='/admin/edit'>Edit your LinkNest</Link>
            <br />
            <Link to='/admin/account'>Edit your profile</Link>
        </div>
    )
}

export default Dashboard