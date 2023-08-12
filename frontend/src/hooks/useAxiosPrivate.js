import { useEffect } from 'react';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';
import { axiosPrivate } from '../api/axios';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.data?.error === 'Expired token' &&
          !prevRequest.sent
        ) {
          prevRequest.sent = true;
          const newAccessToken = refresh();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
