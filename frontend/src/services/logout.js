import axios from 'axios'
const baseUrl = '/api/logout'

const logout = async () => {
    const response = await axios.post(baseUrl, { withCredentials: true })
    return response.data 
}

export default { logout }