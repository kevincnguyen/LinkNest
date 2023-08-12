import { Link } from 'react-router-dom';
import Emoji from '../components/Emoji';

function NotFound() {
  return (
    <div className="my-12 flex min-h-[70vh] w-full items-center justify-center px-4 text-base-content">
      <div className="flex w-full flex-col items-center gap-8">
        <h1 className="md:text-16xl w-full select-none text-center text-9xl font-black text-neutral-content">
          <Emoji symbol="🪹" label="nest" />
          404
        </h1>
        <p className="text-center text-3xl font-semibold text-accent-content">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="text-center text-2xl text-accent-content md:px-12">
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
