const baseUrl = '/api/login';

const login = async (credentials, axiosPrivate) => {
  const response = await axiosPrivate.post(baseUrl, credentials);
  return response.data;
};

export default { login };
