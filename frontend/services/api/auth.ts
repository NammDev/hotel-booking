import { RegisterFormData } from '@/lib/validations/auth'
import axios from 'axios'

const BASE_URL = 'http://localhost:3001'
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const registerUserApi = async (formData: RegisterFormData) => {
  return await axiosInstance.post(`api/users/register`, formData)
}
