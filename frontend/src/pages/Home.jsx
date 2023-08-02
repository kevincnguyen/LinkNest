import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>  
            <h1>Create and customize a nest of your personal links</h1>
            <h2>Use LinkNest to:</h2>
            <p>Organize all your social media profiles in one place</p>
            <p>Share and connect with your audience with a single link</p>
            <p>Curate a list of your favorite bookmarks and resources</p>
            <Link to='/auth/signup'>
                <button>Get started</button>
            </Link>
        </div>
    )
}

export default Home 