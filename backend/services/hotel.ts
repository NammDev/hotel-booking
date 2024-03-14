import cloudinary from 'cloudinary'
import { Response } from 'express'
import HotelModel from '../models/hotel.model'

export async function uploadImages(imageFiles: Express.Multer.File[]) {
  // upload only 1 image at the time
  const uploadPromises = imageFiles.map(async (image) => {
    // encode the image: convert Buffer to base64
    const b64 = Buffer.from(image.buffer).toString('base64')
    // attach type of image
    let dataURI = 'data:' + image.mimetype + ';base64,' + b64
    // upload to cloudinary
    const res = await cloudinary.v2.uploader.upload(dataURI)
    // get the url of the image
    return res.url
  })

  // wait for all the images to be uploaded then get back string
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
