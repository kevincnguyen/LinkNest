import PropTypes from 'prop-types';

function DisplayTitle({ text }) {
  return (
    <h2 className="mb-2 mt-4 w-full break-words text-center text-xl font-bold text-black">
      {text}
    </h2>
  );
}

DisplayTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DisplayTitle;
