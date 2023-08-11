import PropTypes from 'prop-types'

const DisplayLink = ({ url, desc }) => {
    return (
        <a href={url}
            target="_blank" 
            rel="noopener noreferrer"
            className='flex justify-center items-center text-center py-3 mb-4 w-full max-w-2xl shadow-md
                       rounded-md hover:scale-105 transition-all font-semibold text-gray-700 bg-gray-100'
        >  
            {desc}
        </a>
    )
}

DisplayLink.propTypes = {
    url: PropTypes.string.isRequired, 
    desc: PropTypes.string.isRequired
}

export default DisplayLink