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
                    <ul className='menu menu-horizontal px-1 hidden md:flex'>
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
                    <div className="dropdown">
                        <div tabIndex={0} className="btn btn-ghost md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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
                </div>
            </nav>
        </div>
    )
}

export default HomeNavBar

