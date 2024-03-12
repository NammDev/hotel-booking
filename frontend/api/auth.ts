import { UserType } from '@/lib/type'
import { LoginFormData, RegisterFormData } from '@/lib/validations/auth'
import { axiosInstance } from '.'

export const registerUserApi = async (formData: RegisterFormData) => {
  return await axiosInstance.post(`api/users/register`, formData)
}

export const loginUserApi = async (formData: LoginFormData) => {
  return await axiosInstance.post(`api/auth/login`, formData)
}

export const getUserApi = async (): Promise<UserType> => {
  return (await axiosInstance.get(`api/auth/me`)).data.user
}

export const logoutApi = async () => {
  return await axiosInstance.post(`api/auth/logout`)
}
