import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { sendToken } from '../utils/jwt'
import UserModel from '../models/user.model'

export const registrationUser = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({ message: 'Registration error', error: error.array() })
    }
    let user = await UserModel.findOne({
      email: req.body.email,
    })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    user = new UserModel(req.body)
    await user.save()

    sendToken(user, 200, res)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Server Error Right?' })
  }
}
