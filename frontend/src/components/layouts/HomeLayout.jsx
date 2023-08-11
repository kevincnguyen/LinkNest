import { Outlet } from 'react-router-dom'

import HomeNavBar from '../nav/HomeNavBar'

const HomeLayout = () => {
    return (
        <>
            <HomeNavBar />
            <Outlet />
        </>
    )
}

export default HomeLayout