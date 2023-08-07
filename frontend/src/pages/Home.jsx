import { Link } from 'react-router-dom'
import Emoji from '../components/Emoji'

const Home = () => {
    return (
        <div className='flex flex-col justify-center items-center min-w-screen'>  
            <h1 className='text-3xl text-accent-content font-bold text-center mt-8 mb-10'>
                Create and customize a nest of your personal links
            </h1>
            <h2 className='text-xl text-accent-content text-center mb-4'>
                Use LinkNest to:
            </h2>
            <div className='flex justify-center items-center mb-12'>
                <div className='card w-80 bg-base-200 shadow-md mr-2 border'>
                    <div className='card-body max-w-prose'>
                        <p className='text-accent-content font-bold text-center max-w-prose'>
                            Organize all your links 
                            <Emoji symbol='🔗' label='link' />
                        </p>
                    </div>
                </div>
                <div className='card w-80 bg-base-200 shadow-md ml-2 border'>
                    <div className='card-body'>
                        <p className='text-center text-accent-content font-bold max-w-prose'>
                            Connect with your audience 
                            <Emoji symbol='🫂' label='people' />
                        </p>
                    </div>
                </div>
            </div>
            <Link to='/signup'>
                <button className='btn btn-wide btn-accent font-bold text-accent-content'>
                    Build your own nest
                </button>
            </Link>
        </div>
    )
}

export default Home 