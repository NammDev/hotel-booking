import express from 'express'
import { check } from 'express-validator'
import { loginUser } from '../controllers/auth.controller'

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

export default authRouter
