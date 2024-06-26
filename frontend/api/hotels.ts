import { HotelSearchResponse, HotelType, PaymentIntentResponse } from '@/lib/type'
import { axiosInstance } from '.'

export type SearchParamsType = {
  destination?: string
  checkIn?: string
  checkOut?: string
  adultCount?: string
  childCount?: string
  page?: string
  // facilities?: string[]
  // types?: string[]
  // stars?: string[]
  // maxPrice?: string
  sortOption?: string
}

export const searchHotels = async (
  searchParams: SearchParamsType
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams()
  queryParams.append('destination', searchParams.destination || '')
  queryParams.append('checkIn', searchParams.checkIn || '')
  queryParams.append('checkOut', searchParams.checkOut || '')
  queryParams.append('adultCount', searchParams.adultCount || '')
  queryParams.append('childCount', searchParams.childCount || '')
  queryParams.append('page', searchParams.page || '1')

  // queryParams.append('maxPrice', searchParams.maxPrice || '')
  queryParams.append('sortOption', searchParams.sortOption || '')

  // searchParams.facilities?.forEach((facility) => queryParams.append('facilities', facility))

  // searchParams.types?.forEach((type) => queryParams.append('types', type))
  // searchParams.stars?.forEach((star) => queryParams.append('stars', star))

  const response = await axiosInstance.get(`/api/hotels/search?${queryParams.toString()}`)
  return response.data
}

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await axiosInstance.get(`/api/hotels/${hotelId}`)
  return response.data
}

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await axiosInstance.post(`/api/hotels/${hotelId}/bookings/payment-intent`, {
    numberOfNights,
  })
  return response.data
}
