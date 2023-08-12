import { Link } from 'react-router-dom';
import Emoji from '../components/Emoji';

function NotFound() {
  return (
    <div className="flex items-center justify-center w-full min-h-[70vh] text-base-content my-12 px-4">
      <div className="flex flex-col items-center w-full gap-8">
        <h1 className="text-9xl md:text-16xl w-full select-none text-center font-black text-neutral-content">
          <Emoji symbol="🪹" label="nest" />
          404
        </h1>
        <p className="text-3xl text-accent-content font-semibold text-center">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="text-2xl text-accent-content md:px-12 text-center">
          <span>Want this to be your username? </span>
          <Link to="/signup" className="text-accent hover:text-accent-focus">
            Create your LinkNest now.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
