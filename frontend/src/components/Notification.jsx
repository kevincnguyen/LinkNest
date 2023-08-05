import PropTypes from 'prop-types'

const Notification = ({ message }) => {
    return <>{message ?? null}</>
}

Notification.propTypes = {
    message: PropTypes.string
}

export default Notification