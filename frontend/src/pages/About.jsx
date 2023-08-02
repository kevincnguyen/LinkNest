import photo from '../assets/kevin.jpg'

const About = () => {
    return (
        <div>
            <img src={photo} alt="My Photo"/>
            <div className='textbox'>
                <h1>About Me</h1>
                <p>Hi! I&apos;m Kevin. Check out my LinkNest:</p>
            </div>
        </div>
    )
}

export default About