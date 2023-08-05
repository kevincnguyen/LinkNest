import axios from 'axios'
const baseUrl = '/api/users'

const getInfo = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const getProfilePic = async (id) => {
    const response = await axios.get(`${baseUrl}/profiles/${id}`, { responseType: 'blob' })
    return response.data
}

const update = async (id, updatedUser, axiosPrivate) => {
    const response = await axiosPrivate.put(`${baseUrl}/${id}`, updatedUser)
    return response.data
}

const upload = async (id, updatedUser, axiosPrivate) => {
    console.log(axiosPrivate.defaults.headers['Content-Type'])
    axiosPrivate.defaults.headers['Content-Type'] = 'multipart/form-data'
    const response = await axiosPrivate.put(`${baseUrl}/${id}`, updatedUser)
    return response.data
}

export default { getInfo, getProfilePic, update, upload }
