import PropTypes from 'prop-types';

function DisplayTitle({ text }) {
  return (
    <h2 className="text-black text-xl w-full text-center font-bold mt-4 mb-2 break-words">
      {text}
    </h2>
  );
}

DisplayTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DisplayTitle;
