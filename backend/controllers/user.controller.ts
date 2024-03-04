import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model'

export const registrationUser = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    user = new User(req.body)
    await user.save()
  } catch (error) {
    res.status(500).send({ message: 'Server Error' })
  }
}
