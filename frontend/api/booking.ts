import { BookingFormData } from '@/app/(main)/hotel/[hotelId]/booking/booking-form'
import { axiosInstance } from '.'

export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await axiosInstance.post(`/api/hotels/${formData.hotelId}/bookings`, formData)
  return response.data
}
