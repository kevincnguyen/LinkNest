import useAuth from './useAuth';
import logoutService from '../services/logout';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      await logoutService.logout();
      setAuth({});
    } catch (err) {
      console.err('error', err);
    }
  };

  return logout;
};

export default useLogout;
