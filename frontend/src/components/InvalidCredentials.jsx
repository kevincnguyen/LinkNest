import PropTypes from 'prop-types'

const InvalidCredentials = ({ login }) => {
    return (
        <>
            Invalid {login ? 'username or password' : 'credentials'}.
            <br />
            Please try again.
        </>
    )
}

InvalidCredentials.propTypes = {
    login: PropTypes.bool
}

export default InvalidCredentials