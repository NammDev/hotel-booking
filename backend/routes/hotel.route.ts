import express from 'express'
import {
  bookingHotel,
  getHotelById,
  getHotels,
  paymentIntent,
} from '../controllers/hotel.controller'
import { isAutheticated } from '../middleware/auth'

const hotelRouter = express.Router()

hotelRouter.get('/search', getHotels)
hotelRouter.get('/:id', getHotelById)
hotelRouter.post('/:hotelId/bookings/payment-intent', isAutheticated, paymentIntent)
hotelRouter.post('/:hotelId/bookings', isAutheticated, bookingHotel)

export default hotelRouter
