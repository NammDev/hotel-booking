import express from 'express'
import { getHotelById, getHotels } from '../controllers/hotel.controller'

const hotelRouter = express.Router()

hotelRouter.get('/search', getHotels)
hotelRouter.get('/:id', getHotelById)

export default hotelRouter
