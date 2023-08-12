import PropTypes from 'prop-types';

function ProfilePicture({ src }) {
  return (
    <div className="avatar">
      <div className="w-28 rounded-full">
        <img src={src} alt="Profile Picture" />
      </div>
    </div>
  );
}

ProfilePicture.propTypes = {
  src: PropTypes.string.isRequired,
};

export default ProfilePicture;
