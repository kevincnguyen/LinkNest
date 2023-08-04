import { NavLink } from 'react-router-dom'

import Emoji from './Emoji'

const HomeNavBar = () => {
    return (
        <nav>
            <div>
                <NavLink to='/'>
                    <h1>
                        <Emoji symbol='🪹' label='nest' />
                        LinkNest
                    </h1>
                </NavLink>
            </div>
            <ul>
                <li><NavLink to='/about'>About</NavLink></li>
                <li><NavLink to='/login'>Log in</NavLink></li>
                <li><NavLink to='/signup'>Sign up</NavLink></li>
            </ul>
        </nav>
    )
}

export default HomeNavBar

