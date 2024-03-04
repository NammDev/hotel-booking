import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import 'dotenv/config'
import userRouter from './routes/user.route'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/users', userRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
