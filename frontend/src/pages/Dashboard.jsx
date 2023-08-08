import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Emoji from '../components/Emoji'

const Dashboard = () => {
    const { auth } = useAuth()
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-start items-start w-3/5'>  
                <h1 className='text-5xl text-accent-content font-bold mt-8 mb-10'>
                    Welcome to LinkNest, {auth.user.name}
                    <Emoji symbol='👋' label='hand-wave'/>
                </h1>
                <div className='flex flex-col justify-start items-start'>
                    <h3 className='text-xl font-semibold text-accent-content'>
                        Select an option:
                    </h3>
                    <Link to='/admin/links' className='py-2'>
                        <button className='btn btn-wide sm:btn-sm md:btn-md lg:btn-lg btn-secondary'>
                            Edit links
                        </button>
                    </Link>
                    <Link to='/admin/appearance' className='py-2'>
                        <button className='btn btn-wide sm:btn-sm md:btn-md lg:btn-lg btn-accent'>
                            Edit appearance
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard