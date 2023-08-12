import axios from 'axios';

const axiosPrivate = axios.create({
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosPrivate;
