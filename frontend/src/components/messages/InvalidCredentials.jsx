import PropTypes from 'prop-types';

function InvalidCredentials({ login }) {
  return (
    <>
      Invalid {login ? 'username or password' : 'inputs'}
      .
      <br />
      Please try again.
    </>
  );
}

InvalidCredentials.propTypes = {
  login: PropTypes.bool,
};

export default InvalidCredentials;
