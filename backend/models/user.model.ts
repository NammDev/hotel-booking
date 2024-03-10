import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcryptjs'
require('dotenv').config()
import jwt from 'jsonwebtoken'

export interface IUser extends Document {
  email: string
  password: string
  firstName: string
  lastName: string
  SignAccessToken: () => string
  SignRefreshToken: () => string
  comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

// sign access token
userSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN as string, {
    expiresIn: '5m',
  })
}

// sign refresh token
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN as string, {
    expiresIn: '3d',
  })
}

// compare password
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password)
}

const UserModel = mongoose.model<IUser>('User', userSchema)

export default UserModel
