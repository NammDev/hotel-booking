import { addHotelSchema, updateHotelSchema } from '@/lib/validations/hotel'
import { z } from 'zod'
import { axiosInstance, axiosInstanceForm } from '.'
import axios from 'axios'
import { HotelType } from '@/lib/type'

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

  return await axiosInstanceForm.post('/api/my-hotels', formData)
}

export async function updateHotel(formDataJson: z.infer<typeof updateHotelSchema>) {
  console.log('update hotel', formDataJson)
}

export const deleteMyHotelById = async (hotelId: string) => {
  console.log('delete Hotel', hotelId)
}

// export const fetchMyHotels = async (): Promise<HotelType[]> => {
//   const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
//     credentials: 'include',
//   })

//   if (!response.ok) {
//     throw new Error('Error fetching hotels')
//   }

//   return response.json()
// }

export const fetchMyHotels = async () => {
  return await axiosInstance.get('/api/my-hotels')
}

export const fetchMyHotelById = async (hotelId: string) => {
  return await axiosInstance.get(`/api/my-hotels/${hotelId}`)
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
