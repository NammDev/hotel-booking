import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import 'dotenv/config'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'Hello from server!' })
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
