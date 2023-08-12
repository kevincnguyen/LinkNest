import PropTypes from 'prop-types';

function DisplayLink({ url, desc }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-4 flex w-full max-w-2xl items-center justify-center rounded-md bg-gray-100 py-3
                       text-center font-semibold text-gray-700 shadow-md transition-all hover:scale-105"
    >
      {desc}
    </a>
  );
}

DisplayLink.propTypes = {
  url: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default DisplayLink;
