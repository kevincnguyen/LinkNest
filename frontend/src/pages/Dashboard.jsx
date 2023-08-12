import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Emoji from '../components/Emoji';

function Dashboard() {
  const { auth } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-3/5 flex-col items-start justify-start">
        <h1 className="mb-10 mt-14 break-words text-5xl font-bold text-accent-content">
          Welcome to LinkNest, {auth.user.name}
          <Emoji symbol="👋" label="hand-wave" />
        </h1>
        <div className="flex flex-col items-start justify-start">
          <h3 className="text-xl font-semibold text-accent-content">
            Select an option:
          </h3>
          <Link to="/admin/links" className="py-2">
            <button
              type="button"
              className="btn btn-secondary btn-wide text-left sm:btn-sm md:btn-md lg:btn-lg"
            >
              Edit links
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
            </button>
          </Link>
          <Link to="/admin/appearance" className="py-2">
            <button
              type="button"
              className="btn btn-accent btn-wide text-left sm:btn-sm md:btn-md lg:btn-lg"
            >
              Edit appearance
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
