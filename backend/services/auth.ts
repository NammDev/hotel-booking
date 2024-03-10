import { Response } from 'express'
import UserModel from '../models/user.model'

// get user by id
export const getUserById = async (id: string, res: Response) => {
  // const userJson = await redis.get(id)
  const user = await UserModel.findById(id).select('-password')
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    })
  } else {
    res.status(200).json({
      success: true,
      user,
    })
  }
}
