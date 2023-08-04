import PropTypes from 'prop-types'

const Emoji = ({ symbol, label }) => {
    return (
        <span
            className="emoji"
            role="img"
            aria-label={label ? label : ""}
            aria-hidden={label ? "false" : "true"}
        >
            {symbol}
        </span>
    )
}

Emoji.propTypes = {
    symbol: PropTypes.string.isRequired, 
    label: PropTypes.string
}

export default Emoji