import { Link } from 'react-router-dom';
import Emoji from '../components/Emoji';

function Home() {
  return (
    <div className="min-w-screen flex flex-col items-center justify-center">
      <h1 className="mb-10 mt-8 text-center text-4xl font-bold text-accent-content">
        Build a nest of your personal links
      </h1>
      <h2 className="mb-4 text-center text-xl font-semibold text-accent-content">
        Use LinkNest to:
      </h2>
      <div className="mb-12 flex flex-col items-center justify-center md:flex-row">
        <div className="card mx-2 mb-2 w-80 border bg-base-200 shadow-md">
          <div className="card-body max-w-prose">
            <p className="max-w-prose text-center font-bold text-accent-content">
              Organize all your links
              <Emoji symbol="🔗" label="link" />
            </p>
          </div>
        </div>
        <div className="card mx-2 mb-2 w-80 border bg-base-200 shadow-md">
          <div className="card-body">
            <p className="max-w-prose text-center font-bold text-accent-content">
              Connect with your audience
              <Emoji symbol="🫂" label="people" />
            </p>
          </div>
        </div>
      </div>
      <Link to="/signup">
        <button
          type="button"
          className="btn btn-accent btn-wide p-3 font-bold text-accent-content"
        >
          Build your own nest
        </button>
      </Link>
    </div>
  );
}

export default Home;
