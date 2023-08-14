import axios from 'axios';

const baseUrl = '/api/users';

const getInfo = async (username) => {
  const response = await axios.get(`${baseUrl}/${username}`);
  return response.data;
};

const getProfilePic = async (username) => {
  const response = await axios.get(`${baseUrl}/${username}/image`, {
    responseType: 'blob',
  });
  return response.data;
};

const update = async (id, updatedUser, axiosPrivate) => {
  const response = await axiosPrivate.put(`${baseUrl}/${id}`, updatedUser);
  return response.data;
};

const upload = async (id, updatedUser, axiosPrivate) => {
  /* eslint-disable no-param-reassign */
  axiosPrivate.defaults.headers['Content-Type'] = 'multipart/form-data';
  const response = await axiosPrivate.put(`${baseUrl}/${id}`, updatedUser);
  axiosPrivate.defaults.headers['Content-Type'] = 'application/json';
  /* eslint-disable no-param-reassign */
  return response.data;
};

export default {
  getInfo,
  getProfilePic,
  update,
  upload,
};
