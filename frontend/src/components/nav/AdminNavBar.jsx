import { NavLink, useNavigate } from 'react-router-dom';

import Emoji from '../Emoji';
import useLogout from '../../hooks/useLogout';

function AdminNavBar() {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex justify-center border-b ">
      <nav className="navbar w-3/4">
        <div className="navbar-start">
          <NavLink to="/admin/dashboard">
            <h2 className="text-2xl font-bold">
              <Emoji symbol="🪹" label="nest" />
              LinkNest
            </h2>
          </NavLink>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal hidden px-1 lg:flex">
            <li className="text-base font-bold">
              <NavLink to="/admin/dashboard">Dashboard</NavLink>
            </li>
            <li className="text-base font-bold">
              <NavLink to="/admin/account">Profile</NavLink>
            </li>
            <li className="text-base font-bold">
              <button type="button" onClick={handleLogout}>
                Log out
              </button>
            </li>
          </ul>
          <div className="dropdown mr-8">
            <div tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-32 bg-base-100 p-2 shadow"
            >
              <li className="text-base font-bold">
                <NavLink to="/admin/dashboard">Dashboard</NavLink>
              </li>
              <li className="text-base font-bold">
                <NavLink to="/admin/account">Profile</NavLink>
              </li>
              <li className="text-base font-bold">
                <button type="button" onClick={handleLogout}>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavBar;
