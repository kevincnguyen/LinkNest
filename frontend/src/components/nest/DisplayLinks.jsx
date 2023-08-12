import PropTypes from 'prop-types';
import DisplayLink from './DisplayLink';

function DisplayLinks({ links }) {
  const sortedLinks = links.sort((a, b) => a.position - b.position);

  return (
    <div className="w-full">
      {sortedLinks.map((link) => (
        <DisplayLink key={link.id} url={link.url} desc={link.desc} />
      ))}
    </div>
  );
}

DisplayLinks.propTypes = {
  links: PropTypes.array,
};

export default DisplayLinks;
