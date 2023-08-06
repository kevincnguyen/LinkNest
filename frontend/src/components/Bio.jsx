import PropTypes from 'prop-types'

const Bio = ({ text }) => {
    return (
        <p>
            {text}
        </p>
    )
}

Bio.propTypes = {
    text: PropTypes.string.isRequired
}

export default Bio