import axios from 'axios'
const baseUrl = '/api/auth'

const authorize = async () => {
    const response = await axios.get(baseUrl, { withCredentials: true })
    console.log(response)
    return response.status
}

export default { authorize }