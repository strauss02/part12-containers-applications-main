import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://localhost:5000',
})

export default apiClient
