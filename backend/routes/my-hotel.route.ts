import express from 'express'
import { isAutheticated } from '../middleware/auth'
import {
  createNewHotel,
  getMyHotelById,
  getMyHotels,
  updateHotel,
} from '../controllers/my-hotel.controller'
import multer from 'multer'

const myHotelRouter = express.Router()

// multer setup
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
})

myHotelRouter.post('/', isAutheticated, upload.array('imageFiles', 6), createNewHotel)
myHotelRouter.put('/:hotelId', isAutheticated, upload.array('imageFiles', 6), updateHotel)
myHotelRouter.get('/', isAutheticated, getMyHotels)
myHotelRouter.get('/:id', isAutheticated, getMyHotelById)

export default myHotelRouter
