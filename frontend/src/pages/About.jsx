import { Link } from 'react-router-dom'
import Photo from '../assets/kevin.jpg'
import Emoji from '../components/Emoji'

const About = () => {
    return (
        <div className='flex flex-col justify-center items-center min-w-screen'>
            <div className='card lg:card-side card-bordered w-3/5 mt-8 bg-base-100 shadow-xl'>
                <figure>
                    <img 
                        src={Photo} 
                        alt="My Photo"
                        className='w-72'
                    />
                </figure>
                <div className='card-body'>
                    <h1 className='card-title text-4xl text-accent-content font-bold'>
                        About Me
                        <Emoji symbol='🐧' label='bear' />
                    </h1>
                    <p className='text-xl'>
                        Hi! I&apos;m Kevin. 
                        <br />
                        Check out my LinkNest:
                    </p>
                    <Link to='/kevin' className='card-actions'>
                        <button className='btn btn-block btn-accent font-bold'>
                            Connect with me
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default About