import { Outlet } from 'react-router-dom';
import HomeNavBar from '../nav/HomeNavBar';

function HomeLayout() {
  return (
    <>
      <HomeNavBar />
      <Outlet />
    </>
  );
}

export default HomeLayout;
