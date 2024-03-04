import express from 'express'
import { check, validationResult } from 'express-validator'
import { registrationUser } from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.post(
  '/register',
  [
    check('firstName', 'First Name is required').isString(),
    check('lastName', 'Last Name is required').isString(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with 6 or more characters required').isLength({
      min: 6,
    }),
  ],
  registrationUser
)

export default userRouter
