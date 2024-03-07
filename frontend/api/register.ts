import type { z } from 'zod'
import { authSchema } from '@/lib/validations/auth'
import axios from 'axios'

type RegisterFormData = z.infer<typeof authSchema>

export const register = async (formData: RegisterFormData) => {
  const response = await axios.post(`${API_BASE_URL}/api/users/register`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}
