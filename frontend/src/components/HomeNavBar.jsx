import { NavLink } from 'react-router-dom'

const HomeNavBar = () => {
    return (
        <nav>
            <NavLink to='/'>
                <h1>LinkNest</h1>
            </NavLink>
            <ul>
                <li><NavLink to='/about'>About</NavLink></li>
                <li><NavLink to='/auth/login'>Log in</NavLink></li>
                <li><NavLink to='/auth/signup'>Sign up</NavLink></li>
            </ul>
        </nav>
    )
}

export default HomeNavBar

