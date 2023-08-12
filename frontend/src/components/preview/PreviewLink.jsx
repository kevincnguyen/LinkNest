import PropTypes from 'prop-types';

function PreviewLink({ url, desc }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-1 flex w-full flex-col items-center justify-center rounded-md bg-gray-100 p-1 text-center
                    text-sm font-semibold text-gray-700 shadow-md transition-all hover:scale-105"
    >
      {desc}
    </a>
  );
}

PreviewLink.propTypes = {
  url: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default PreviewLink;
