import { createHotel } from './../services/hotel'
import { Request, Response } from 'express'
import { uploadImages } from '../services/hotel'
import { HotelType } from '../shared/types'
import HotelModel from '../models/hotel.model'

export const getMyHotel = async (req: Request, res: Response) => {
  try {
    const hotels = await HotelModel.find({ userId: req.userId })

    // const hotels = await HotelModel.find({ userId: req.userId }).select(
    //   '-hotelData.name -hotelData.description'
    // )
    res.json(hotels)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels' })
  }
}

export const createNewHotel = async (req: Request, res: Response) => {
  try {
    // get file from multer
    const imageFiles = req.files as Express.Multer.File[]

    // upload the images to cloudinary
    const imageUrls = await uploadImages(imageFiles)

    // asign data to newHotel
    const newHotel: HotelType = req.body
    newHotel.imageUrls = imageUrls
    newHotel.lastUpdated = new Date()
    newHotel.userId = req.userId as string

    // save hotel and return
    createHotel(newHotel, res)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
