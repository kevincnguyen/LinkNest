import PropTypes from 'prop-types';

import GitHubIcon from '../icons/GitHubIcon';
import LinkedinIcon from '../icons/LinkedinIcon';
import InstagramIcon from '../icons/InstagramIcon';
import YouTubeIcon from '../icons/YouTubeIcon';
import FacebookIcon from '../icons/FacebookIcon';

function DisplayIcons({ links }) {
  return (
    <div className="mt-2 flex items-center gap-4 text-white">
      {links.map((link) => (
        <a
          aria-label={`link to ${link.url}`}
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.url.includes('github') ? (
            <GitHubIcon />
          ) : link.url.includes('linkedin') ? (
            <LinkedinIcon />
          ) : link.url.includes('instagram') ? (
            <InstagramIcon />
          ) : link.url.includes('youtube') ? (
            <YouTubeIcon />
          ) : link.url.includes('facebook') ? (
            <FacebookIcon />
          ) : null}
        </a>
      ))}
    </div>
  );
}

DisplayIcons.propTypes = {
  links: PropTypes.array,
};

export default DisplayIcons;
