import { Link } from 'react-router-dom'

import Emoji from "./Emoji"

const Logo = () => {
    return (
        <Link to='/'>
            <p>
                <Emoji symbol='🪹' label='nest' />
                LinkNest
            </p>
        </Link>
    )
}

export default Logo