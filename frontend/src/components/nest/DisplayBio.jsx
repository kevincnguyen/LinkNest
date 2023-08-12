import PropTypes from 'prop-types';

function DisplayBio({ text }) {
  return (
    <p className="mb-6 max-w-[85%] break-words text-center text-lg font-semibold text-black">
      {text}
    </p>
  );
}

DisplayBio.propTypes = {
  text: PropTypes.string,
};

export default DisplayBio;
