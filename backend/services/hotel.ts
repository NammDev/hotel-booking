import cloudinary from 'cloudinary'
import { Response } from 'express'
import HotelModel from '../models/hotel.model'

export async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString('base64')
    let dataURI = 'data:' + image.mimetype + ';base64,' + b64
    const res = await cloudinary.v2.uploader.upload(dataURI)
    return res.url
  })
  const imageUrls = await Promise.all(uploadPromises)
  return imageUrls
}

// create hotel
export const createHotel = async (data: any, res: Response) => {
  const course = await HotelModel.create(data)
  res.status(201).json({
    success: true,
    course,
  })
}
