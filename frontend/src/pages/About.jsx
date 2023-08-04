import { Link } from 'react-router-dom'
import Photo from '../assets/kevin.jpg'

const About = () => {
    return (
        <div>
            <img src={Photo} alt="My Photo"/>
            <div className='textbox'>
                <h1>About Me</h1>
                <p>Hi! I&apos;m Kevin. Check out my LinkNest:</p>
            </div>
            <Link to='/kevin'>
                <button>Connect with me</button>
            </Link>
        </div>
    )
}

export default About