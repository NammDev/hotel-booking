import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import User from '../models/user.model'

export const registrationUser = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({ message: 'Registration error', error: error.array() })
    }
    let user = await User.findOne({
      email: req.body.email,
    })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    user = new User(req.body)
    await user.save()

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    })
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000,
    })
    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Server Error Right?' })
  }
}
