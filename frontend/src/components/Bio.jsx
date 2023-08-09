import PropTypes from 'prop-types'

const Bio = ({ text }) => {
    return (
        <p className="text-black text-lg text-center font-semibold max-w-[85%] mb-6 break-words">
            {text}
        </p>
    )
}

Bio.propTypes = {
    text: PropTypes.string
}

export default Bio