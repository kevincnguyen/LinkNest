import PropTypes from 'prop-types'

const ProfilePicture = ({ src }) => {
    return (
        <img
            src={src}
            alt='Profile Picture'
            style={{ width: '40%' }}
        />
    )
}

ProfilePicture.propTypes = {
    src: PropTypes.string.isRequired
}

export default ProfilePicture