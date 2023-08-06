import { Link } from 'react-router-dom'
import Emoji from '../components/Emoji'

const NotFound = () => {
    return (
        <>
            <Emoji symbol='🪹' label='nest' />
            <h1>The page you&apos;re looking for doesn&apos;t exist.</h1>
            <span>Want this to be your username? </span> 
            <Link to='/signup'>Create your LinkNest now.</Link>
        </>
    )
}

export default NotFound