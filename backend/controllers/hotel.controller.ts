import { Request, Response } from 'express'
import HotelModel from '../models/hotel.model'
import { HotelSearchResponse } from '../shared/types'

export const getHotels = async (req: Request, res: Response) => {
  try {
    const pageSize = 5
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1')
    const skip = (pageNumber - 1) * pageSize

    const hotels = await HotelModel.find().skip(skip).limit(pageSize)
    const total = await HotelModel.countDocuments()

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    }

    res.json(response)
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
