import { Response, NextFunction, Request } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
// import { updateAccessToken } from '../controllers/user.controller'

declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}

// authenticated user
export const isAutheticated = async (req: Request, res: Response, next: NextFunction) => {
  const access_token = req.cookies.access_token
  if (!access_token) {
    return res.status(400).json({ message: 'Please login to access this resource' })
  }

  const decoded = jwt.decode(access_token) as JwtPayload
  if (!decoded) {
    return res.status(400).json({ message: 'Access token is not valid' })
  }

  // check if the access token is expired
  if (decoded.exp && decoded.exp <= Date.now() / 1000) {
    try {
      // await updateAccessToken(req, res, next)
      console.log('Access token is expired')
    } catch (error) {
      return next(error)
    }
  } else {
    // redis
    // const user = await redis.get(decoded.id)
    // if (!user) {
    //   return next(new ErrorHandler('Please login to access this resource', 400))
    // }
    // req.user = JSON.parse(user)

    req.userId = decoded.id
    next()
  }
}

// export const authorizeRoles = (...roles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!roles.includes(req.user?.role || '')) {
//       return next(
//         new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`, 403)
//       )
//     }
//     next()
//   }
// }
