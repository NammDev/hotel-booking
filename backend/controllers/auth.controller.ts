import { sendToken, accessTokenOptions, refreshTokenOptions } from './../utils/jwt'
import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { getUserById } from '../services/auth'
import UserModel from '../models/user.model'

import jwt, { JwtPayload } from 'jsonwebtoken'

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
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Can not find this email!' })
    }

    // check if the password is correct
    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    sendToken(user, 200, res)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' })
  }
}

export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req?.userId as string
    getUserById(userId, res)
  } catch (error: any) {
    return res.status(400).json(error.message)
  }
}

// update access token
export const updateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refresh_token = req.cookies.refresh_token as string
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload

    const message = 'Could not refresh token'
    if (!decoded) {
      return res.status(400).json({ message })
    }

    const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN as string, {
      expiresIn: '5m',
    })

    const refreshToken = jwt.sign({ id: decoded.id }, process.env.REFRESH_TOKEN as string, {
      expiresIn: '3d',
    })

    req.userId = decoded.id

    res.cookie('access_token', accessToken, accessTokenOptions)
    res.cookie('refresh_token', refreshToken, refreshTokenOptions)

    return next()
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

// logout user
export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie('access_token', '', { maxAge: 1 })
    res.cookie('refresh_token', '', { maxAge: 1 })
    // const userId = req.userId || ''
    // redis.del(userId)
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    })
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
