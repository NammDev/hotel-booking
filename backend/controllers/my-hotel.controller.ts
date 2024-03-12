import { createHotel } from './../services/hotel'
import { Request, Response } from 'express'
import { uploadImages } from '../services/hotel'
import { HotelType } from '../shared/types'

export const getMyHotel = async (req: Request, res: Response) => {
  try {
    // const hotels = await Hotel.find({ userId: req.userId })
    // res.json(hotels)
  } catch (error) {
    // res.status(500).json({ message: 'Error fetching hotels' })
  }
}

export const createNewHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[]
    const imageUrls = await uploadImages(imageFiles)

    // asign data to newHotel
    const newHotel: HotelType = req.body
    newHotel.imageUrls = imageUrls
    newHotel.lastUpdated = new Date()
    newHotel.userId = req.userId as string

    createHotel(newHotel, res)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
