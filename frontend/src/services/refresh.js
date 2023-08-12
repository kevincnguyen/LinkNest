import axios from 'axios';

const baseUrl = '/api/refresh';

const refresh = async () => {
  const config = {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await axios.post(baseUrl, config);
  return response.data;
};

export default { refresh };
