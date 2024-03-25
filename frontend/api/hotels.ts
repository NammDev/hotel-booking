import { HotelSearchResponse } from '@/lib/type'
import { axiosInstance } from '.'

export type SearchParamsType = {
  destination?: string
  checkIn?: string
  checkOut?: string
  adultCount?: string
  childCount?: string
  page?: string
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
  const response = await axiosInstance.get(`/api/hotels/search?${queryParams.toString()}`)
  return response.data
}
