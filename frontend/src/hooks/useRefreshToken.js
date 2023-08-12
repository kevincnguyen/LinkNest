import useAuth from './useAuth';
import refreshService from '../services/refresh';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const { accessToken } = await refreshService.refresh();
    setAuth((prev) => {
      console.log(prev);
      console.log(accessToken);
      return { ...prev, accessToken };
    });
    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
