import { addHotelSchema } from '@/lib/validations/hotel'
import { z } from 'zod'
import { axiosInstance } from '.'
import axios from 'axios'

export async function addHotel(formDataJson: z.infer<typeof addHotelSchema>) {
  const {
    name,
    city,
    country,
    adultCount,
    childCount,
    facilities,
    pricePerNight,
    starRating,
    type,
    description,
    imageFiles,
    slug,
  } = formDataJson
  const formData = new FormData()

  formData.append('name', name)
  formData.append('city', city)
  formData.append('country', country)
  formData.append('slug', slug as string)
  formData.append('description', description || '')
  formData.append('type', type)
  formData.append('pricePerNight', pricePerNight.toString())
  formData.append('starRating', starRating.toString())
  formData.append('adultCount', adultCount.toString())
  formData.append('childCount', childCount.toString())

  facilities.forEach((facility, index) => {
    formData.append(`facilities[${index}]`, facility)
  })

  Array.from(imageFiles).forEach((imageFile) => {
    formData.append(`imageFiles`, imageFile)
  })

  console.log(formData.forEach((value, key) => console.log(key, value)))

  return await axios.post(`http://localhost:3001/api/my-hotels`, formData, {
    withCredentials: true,
  })
}

// export const updateMyHotelById = async (editHotelData: z.infer<typeof editHotelSchema>) => {
// const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`, {
//   method: 'PUT',
//   body: hotelFormData,
//   credentials: 'include',
// })
// if (!response.ok) {
//   throw new Error('Failed to update Hotel')
// }
// return response.json()
// }
