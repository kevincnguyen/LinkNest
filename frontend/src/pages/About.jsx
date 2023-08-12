import { Link } from 'react-router-dom';
import Photo from '../assets/kevin.jpg';
import Emoji from '../components/Emoji';

function About() {
  return (
    <div className="min-w-screen flex flex-col items-center justify-center">
      <div className="card card-bordered mt-8 w-3/5 bg-base-100 shadow-xl lg:card-side">
        <figure>
          <img src={Photo} alt="Kevin" className="w-72" />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-4xl font-bold text-accent-content">
            About Me
            <Emoji symbol="🐧" label="bear" />
          </h1>
          <p className="text-xl">
            Hi! I&apos;m Kevin.
            <br />
            Check out my LinkNest:
          </p>
          <Link
            to="/kevin"
            target="_blank"
            rel="noopener noreferrer"
            className="card-actions"
          >
            <button
              type="button"
              className="btn btn-accent btn-block font-bold"
            >
              Connect with me
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
