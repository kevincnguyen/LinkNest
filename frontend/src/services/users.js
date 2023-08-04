import axios from 'axios'
const baseUrl = '/api/users'

const get = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const update = async (id, updatedUser, axiosPrivate) => {
    const response = await axiosPrivate.put(`${baseUrl}/${id}`, updatedUser)
    return response.data
}

export default { get, update }
