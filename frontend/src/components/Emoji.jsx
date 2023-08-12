import PropTypes from 'prop-types';

function Emoji({ symbol, label }) {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label || ''}
      aria-hidden={label ? 'false' : 'true'}
    >
      {symbol}
    </span>
  );
}

Emoji.propTypes = {
  symbol: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default Emoji;
