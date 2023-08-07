import { NavLink } from 'react-router-dom'

import Emoji from './Emoji'

const HomeNavBar = () => {
    return (
        <div className='flex justify-center border-b'>
            <nav className='w-3/4 navbar'>
                <div className='navbar-start'>
                    <NavLink to='/'>
                        <h2 className='text-2xl font-bold'>
                            <Emoji symbol='🪹' label='nest' />
                            LinkNest
                        </h2>
                    </NavLink>
                </div>
                <div className='navbar-end'>
                    <ul className='menu menu-horizontal px-1'>
                        <li className='text-base font-bold'>
                            <NavLink to='/about'>
                                About
                            </NavLink>
                        </li>
                        <li className='text-base font-bold'>
                            <NavLink to='/login'>
                                Log in
                            </NavLink>
                        </li>
                        <li className='text-base font-bold'>
                            <NavLink to='/signup'>
                                Sign up
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default HomeNavBar

