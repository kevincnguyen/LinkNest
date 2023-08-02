import PropTypes from 'prop-types'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <>{message}</>
    )
}

Notification.propTypes = {
    message: PropTypes.string
}

export default Notification