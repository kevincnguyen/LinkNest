import PropTypes from 'prop-types'

const PreviewLink = ({ url, desc }) => {
    return (
        <a href={url}
            target="_blank" 
            rel="noopener noreferrer"
            className='flex flex-col justify-center items-center text-center text-sm p-1 mb-1 w-full shadow-md
                    rounded-md hover:scale-105 transition-all font-semibold text-gray-700 bg-gray-100'
        >  
            {desc}
        </a>
    )
}

PreviewLink.propTypes = {
    url: PropTypes.string.isRequired, 
    desc: PropTypes.string.isRequired
}

export default PreviewLink