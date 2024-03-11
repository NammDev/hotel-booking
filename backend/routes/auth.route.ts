import express from 'express'
import { check } from 'express-validator'
import { getUserInfo, loginUser, logoutUser } from '../controllers/auth.controller'
import { isAutheticated } from '../middleware/auth'

const authRouter = express.Router()

authRouter.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with 6 or more characters required').isLength({
      min: 6,
    }),
  ],
  loginUser
)

authRouter.get('/me', isAutheticated, getUserInfo)
authRouter.post('/logout', isAutheticated, logoutUser)

export default authRouter
