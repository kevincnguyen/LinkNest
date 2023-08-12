import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import usersService from '../services/users';
import AlreadyExists from '../components/messages/AlreadyExists';
import NoMatchPasswords from '../components/messages/NoMatchPasswords';
import NoServerResponse from '../components/messages/NoServerResponse';
import InvalidCredentials from '../components/messages/InvalidCredentials';

function Account() {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setName(auth.user.name);
    setUsername(auth.user.username);
  }, [auth.user.name, auth.user.username]);

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      if (!name || !username || !email || !password || !confirmPassword) {
        toast.warn('Missing required field(s).', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else if (password.length < 8 || confirmPassword.length < 8) {
        toast.warn('Password must be at least 8 characters.', {
          position: toast.POSITION.TOP_CENTER,
        });
        setPassword('');
        setConfirmPassword('');
      } else if (password !== confirmPassword) {
        toast.warn(<NoMatchPasswords />, {
          position: toast.POSITION.TOP_CENTER,
        });
        setPassword('');
        setConfirmPassword('');
      } else {
        const updatedUser = await usersService.update(
          auth.user.id,
          {
            name,
            username,
            email,
            password,
          },
          axiosPrivate,
        );
        setAuth({ user: updatedUser, accessToken: auth.accessToken });
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        toast.success('Account details successfully updated.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.error('error: ', err);
      if (!err.response) {
        toast.error(<NoServerResponse />, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else if (
        username !== auth.user.username &&
        email !== auth.user.email &&
        err.response.data.error.includes('username') &&
        err.response.data.error.includes('email')
      ) {
        toast.error(<AlreadyExists user email />, {
          position: toast.POSITION.TOP_CENTER,
        });
        setUsername('');
        setEmail('');
      } else if (
        username !== auth.user.username &&
        err.response.data.error.includes('username')
      ) {
        toast.error(<AlreadyExists user />, {
          position: toast.POSITION.TOP_CENTER,
        });
        setUsername('');
      } else if (
        email !== auth.user.email &&
        err.response.data.error.includes('email')
      ) {
        toast.error(<AlreadyExists email />, {
          position: toast.POSITION.TOP_CENTER,
        });
        setEmail('');
      } else {
        toast.error(<InvalidCredentials />, {
          position: toast.POSITION.TOP_CENTER,
        });
        setName('');
        setUsername('');
        setEmail('');
      }
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="relative flex flex-col justify-center">
      <div className="m-auto mt-3 w-full rounded-md border bg-base-100 p-6 shadow-md lg:max-w-xl">
        <h2 className="text-center text-3xl font-semibold">
          Edit account details
        </h2>
        <form onSubmit={handleSave} className="form-control space-y-2">
          <div>
            <label htmlFor="name" className="label">
              <span className="label-text text-base">Name</span>
            </label>
            <input
              type="text"
              value={name}
              id="name"
              name="Name"
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              required
              className="input input-bordered input-primary w-full"
            />
          </div>
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
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="label">
              <span className="label-text text-base">Email</span>
            </label>
            <input
              type="email"
              value={email}
              id="email"
              name="Email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
              className="input input-bordered input-primary w-full"
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
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="label">
              <span className="label-text text-base">Confirm Password</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              id="confirm-password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
              required
              className="input input-bordered input-primary w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Save changes
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Account;
