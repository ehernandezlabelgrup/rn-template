import axios from 'axios'
import {getBaseUrl, getTimeout} from '.'

export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: getTimeout(),
})

api.interceptors.request.use(
  config => {
    config.params = {
      ...config.params,
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  },
)

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}
