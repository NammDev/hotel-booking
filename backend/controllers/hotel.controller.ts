import { Request, Response } from 'express'
import HotelModel from '../models/hotel.model'
import { BookingType, HotelSearchResponse } from '../shared/types'
import { stripe } from '../utils/stripe'

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {}

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, 'i') },
      { country: new RegExp(queryParams.destination, 'i') },
    ]
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    }
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    }
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    }
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types) ? queryParams.types : [queryParams.types],
    }
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars)

    constructedQuery.starRating = { $in: starRatings }
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    }
  }

  return constructedQuery
}

export const getHotels = async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query)

    let sortOptions = {}
    switch (req.query.sortOption) {
      case 'starRating':
        sortOptions = { starRating: -1 }
        break
      case 'pricePerNightAsc':
        sortOptions = { pricePerNight: 1 }
        break
      case 'pricePerNightDesc':
        sortOptions = { pricePerNight: -1 }
        break
    }

    const pageSize = 8
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1')
    const skip = (pageNumber - 1) * pageSize

    const hotels = await HotelModel.find(query).sort(sortOptions).skip(skip).limit(pageSize)

    const total = await HotelModel.countDocuments(query)

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

export const getHotelById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id.toString()
    const hotel = await HotelModel.findById(id)
    res.json(hotel)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching hotel' })
  }
}

export const paymentIntent = async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId
  const hotel = await HotelModel.findById(hotelId)
  if (!hotel) return res.status(400).json({ message: 'Hotel not found' })

  const { numberOfNights } = req.body
  const totalCost = hotel.pricePerNight * numberOfNights

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost * 100,
    currency: 'cad',
    metadata: {
      hotelId,
      userId: req.userId as string,
    },
  })
  if (!paymentIntent.client_secret)
    return res.status(500).json({ message: 'Error creating payment intent' })

  res.send({
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalCost,
  })
}

export const bookingHotel = async (req: Request, res: Response) => {
  try {
    const paymentIntentId = req.body.paymentIntentId
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string)
    if (!paymentIntent) return res.status(400).json({ message: 'payment intent not found' })

    if (
      paymentIntent.metadata.hotelId !== req.params.hotelId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      return res.status(400).json({ message: 'payment intent mismatch' })
    }

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
      })
    }

    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId,
    }

    const hotel = await HotelModel.findOneAndUpdate(
      { _id: req.params.hotelId },
      {
        $push: { bookings: newBooking },
      }
    )
    if (!hotel) return res.status(400).json({ message: 'hotel not found' })
    await hotel.save()

    res.status(200).send()
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'something went wrong' })
  }
}
