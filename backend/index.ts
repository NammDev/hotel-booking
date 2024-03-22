import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { rateLimit } from 'express-rate-limit'
import express, { Request, Response } from 'express'
import path from 'path'

import 'dotenv/config'

import userRouter from './routes/user.route'
import authRouter from './routes/auth.route'
import { v2 as cloudinary } from 'cloudinary'
import myHotelRouter from './routes/my-hotel.route'
import hotelRouter from './routes/hotel.route'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express()

// body parser
app.use(express.json({ limit: '50mb' }))

// url encoded
app.use(express.urlencoded({ extended: true }))

// cookie parser
app.use(cookieParser())

// cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)

// api requests limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})

app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/my-hotels', myHotelRouter)
app.use('/api/hotels', hotelRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

app.use(limiter)
