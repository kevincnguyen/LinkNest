import PropTypes from 'prop-types'

const DisplayBio = ({ text }) => {
    return (
        <p className="text-black text-lg text-center font-semibold max-w-[85%] mb-6 break-words">
            {text}
        </p>
    )
}

DisplayBio.propTypes = {
    text: PropTypes.string
}

export default DisplayBio