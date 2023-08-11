import PropTypes from 'prop-types'

const AlreadyExists = ({ user, email }) => {
    let output = user && email ? 'username and email' : email ? 'email' : 'username';

    return (
        <>
            An account already exists with that {output}.
            <br />
            Please try a different {output}.
        </>
    )
}

AlreadyExists.propTypes = {
    user: PropTypes.bool,
    email: PropTypes.bool
}

export default AlreadyExists