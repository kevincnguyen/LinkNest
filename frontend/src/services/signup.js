import axios from 'axios';

const baseUrl = '/api/signup';

const signup = async (info) => {
  const response = await axios.post(baseUrl, info);
  return response.data;
};

export default { signup };
