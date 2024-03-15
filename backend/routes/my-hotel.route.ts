import express from 'express'
import { isAutheticated } from '../middleware/auth'
import { createNewHotel, getMyHotels } from '../controllers/my-hotel.controller'
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
myHotelRouter.get('/', isAutheticated, getMyHotels)

export default myHotelRouter
