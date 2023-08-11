import axios from 'axios'
const baseUrl = '/api/users'

const getInfo = async (username) => {
    const response = await axios.get(`${baseUrl}/${username}`)
    return response.data
}

const getProfilePic = async (username) => {
    const response = await axios.get(`${baseUrl}/${username}/image`, { responseType: 'blob' })
    return response.data
}

const update = async (id, updatedUser, axiosPrivate) => {
    const response = await axiosPrivate.put(`${baseUrl}/${id}`, updatedUser)
    return response.data
}

const upload = async (id, updatedUser, axiosPrivate) => {
    axiosPrivate.defaults.headers['Content-Type'] = 'multipart/form-data'
    const response = await axiosPrivate.put(`${baseUrl}/${id}`, updatedUser)
    return response.data
}

export default { getInfo, getProfilePic, update, upload }
