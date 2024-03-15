export type UserType = {
  _id: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export type HotelCardType = {
  _id: string
  name: string
  description: string
  imageUrls: string[]
}

export type HotelType = {
  _id: string
  userId: string
  name: string
  city: string
  country: string
  description: string
  type: string
  adultCount: number
  childCount: number
  facilities: string[]
  pricePerNight: number
  starRating: number
  imageUrls: string[]
  lastUpdated: Date
  bookings: BookingType[]
}

export type BookingType = {
  _id: string
  userId: string
  firstName: string
  lastName: string
  email: string
  adultCount: number
  childCount: number
  checkIn: Date
  checkOut: Date
  totalCost: number
}

export type HotelSearchResponse = {
  data: HotelType[]
  pagination: {
    total: number
    page: number
    pages: number
  }
}

export type PaymentIntentResponse = {
  paymentIntentId: string
  clientSecret: string
  totalCost: number
}

// fake type of skate
export type ProductType = {
  name: string
  id: number
  price: string
  storeId: number
  inventory: number
  rating: number
  description: string | null
  images: any
  category: 'skateboards' | 'clothing' | 'shoes' | 'accessories'
  subcategory: string | null
  updatedAt: Date | null
  tags: null
  createdAt: Date
}
