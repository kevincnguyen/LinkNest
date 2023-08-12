import { Link } from 'react-router-dom';
import Emoji from '../components/Emoji';

function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-w-screen">
      <h1 className="text-4xl text-accent-content font-bold text-center mt-8 mb-10">
        Build a nest of your personal links
      </h1>
      <h2 className="text-xl text-accent-content text-center font-semibold mb-4">
        Use LinkNest to:
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center mb-12">
        <div className="card w-80 bg-base-200 shadow-md mx-2 mb-2 border">
          <div className="card-body max-w-prose">
            <p className="text-accent-content font-bold text-center max-w-prose">
              Organize all your links
              <Emoji symbol="🔗" label="link" />
            </p>
          </div>
        </div>
        <div className="card w-80 bg-base-200 shadow-md mx-2 mb-2 border">
          <div className="card-body">
            <p className="text-center text-accent-content font-bold max-w-prose">
              Connect with your audience
              <Emoji symbol="🫂" label="people" />
            </p>
          </div>
        </div>
      </div>
      <Link to="/signup">
        <button type="button" className="btn btn-wide btn-accent font-bold p-3 text-accent-content">
          Build your own nest
        </button>
      </Link>
    </div>
  );
}

export default Home;
