import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import loginService from '../services/login';
import NoServerResponse from '../components/messages/NoServerResponse';
import InvalidCredentials from '../components/messages/InvalidCredentials';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { user, accessToken } = await loginService.login(
        {
          username: username.toLowerCase(),
          password,
        },
        axiosPrivate,
      );
      setAuth({ user, accessToken });
      setUsername('');
      setPassword('');
      const origin = location.state?.from?.pathname || '/admin/dashboard';
      navigate(origin, { replace: true });
    } catch (err) {
      console.error('error: ', err);
      if (!err.response) {
        toast.error(<NoServerResponse />, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(<InvalidCredentials login />, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="relative flex flex-col justify-center">
      <div className="m-auto mt-8 w-full rounded-md border bg-base-100 p-6 shadow-md lg:max-w-xl">
        <h2 className="text-center text-3xl font-semibold">
          Log in to LinkNest
        </h2>
        <form onSubmit={handleLogin} className="form-control space-y-4">
          <div>
            <label htmlFor="username" className="label">
              <span className="label-text text-base">Username</span>
            </label>
            <input
              type="text"
              value={username}
              id="username"
              name="Username"
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              required
              className="input input-bordered input-secondary w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="label">
              <span className="label-text text-base">Password</span>
            </label>
            <input
              type="password"
              value={password}
              id="password"
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
              className="input input-bordered input-secondary w-full"
            />
          </div>
          <button type="submit" className="btn btn-secondary btn-block">
            Log in
          </button>
        </form>
        <div className="mt-4 text-sm">
          <span>Need an Account? </span>
          <Link to="/signup" className="text-accent hover:text-accent-focus">
            Sign up
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
