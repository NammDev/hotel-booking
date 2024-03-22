import express from 'express'
import { getHotels } from '../controllers/hotel.controller'

const hotelRouter = express.Router()

hotelRouter.get('/search', getHotels)

export default hotelRouter
