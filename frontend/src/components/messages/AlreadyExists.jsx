import PropTypes from 'prop-types';

function AlreadyExists({ user, email }) {
  const output =
    user && email ? 'username and email' : email ? 'email' : 'username';

  return (
    <>
      An account already exists with that {output}
      .
      <br />
      Please try a different {output}.
    </>
  );
}

AlreadyExists.propTypes = {
  user: PropTypes.bool,
  email: PropTypes.bool,
};

export default AlreadyExists;
