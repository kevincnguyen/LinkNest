const baseUrl = '/api/links';

const add = async (newLink, axiosPrivate) => {
  const response = await axiosPrivate.post(baseUrl, newLink);
  return response.data;
};

const update = async (id, updatedLink, axiosPrivate) => {
  const response = await axiosPrivate.put(`${baseUrl}/${id}`, updatedLink);
  return response.data;
};

const remove = async (id, axiosPrivate) => {
  const response = await axiosPrivate.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { add, update, remove };
