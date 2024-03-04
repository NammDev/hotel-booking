import { sendToken } from './../utils/jwt'
import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import User from '../models/user.model'

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  // express validator
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() })
  }

  // data from the request body
  const { email, password } = req.body
  try {
    // check if the user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' })
    }

    // check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' })
    }

    sendToken(user, 200, res)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong!' })
  }
}
