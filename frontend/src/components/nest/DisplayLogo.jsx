import { Link } from 'react-router-dom'

import Emoji from "../Emoji"

const DisplayLogo = () => {
    return (
        <Link to='/' className='text-black text-lg font-semibold mt-12'>
            <p className='hover:text-accent'>
                <Emoji symbol='🪹' label='nest' />
                LinkNest
            </p>
        </Link>
    )
}

export default DisplayLogo