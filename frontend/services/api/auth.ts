import { LoginFormData, RegisterFormData } from '@/lib/validations/auth'
import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    (data) => {
      return JSON.stringify(data)
    },
  ],
  transformResponse: [
    (data) => {
      return JSON.parse(data)
    },
  ],
})

export const registerUserApi = async (formData: RegisterFormData) => {
  return await axiosInstance.post(`api/users/register`, formData)
}

export const loginUserApi = async (formData: LoginFormData) => {
  return await axiosInstance.post(`api/auth/login`, formData)
}

export const validateTokenApi = async () => {
  return await axiosInstance.get(`api/auth/validate-token`)
}
