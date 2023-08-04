import { Outlet } from 'react-router-dom'

import HomeNavBar from '../components/HomeNavBar'
// import AuthenticatedRedirect from '../authentication/AuthenticatedRedirect'

const HomeLayout = () => {
    return (
        <>
            <HomeNavBar />
            <Outlet />
        </>
    )
}

export default HomeLayout