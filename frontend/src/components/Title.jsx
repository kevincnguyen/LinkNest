import PropTypes from 'prop-types'

const Title = ({ text }) => {
    return (
        <h2 className='text-black text-xl text-center font-bold mt-4 mb-2 break-words'>
            {text}
        </h2>
    )
}

Title.propTypes = {
    text: PropTypes.string.isRequired
}

export default Title