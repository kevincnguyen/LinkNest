import { Link } from 'react-router-dom';

import Emoji from '../Emoji';

function DisplayLogo() {
  return (
    <Link to="/" className="mt-12 text-lg font-semibold text-black">
      <p className="hover:text-accent">
        <Emoji symbol="🪹" label="nest" />
        LinkNest
      </p>
    </Link>
  );
}

export default DisplayLogo;
