import axios from 'axios'
const BASE_URL = 'https://reqres.in/api'

export default axios.create({
  baseURL: BASE_URL,
})
