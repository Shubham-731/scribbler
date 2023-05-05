import jwt from "jsonwebtoken"
import User from "../models/User"
import { JWT_SECRET } from "../config/env"
import { JwtPayload } from "jsonwebtoken"
import { Request, RequestHandler, Response, NextFunction } from "express"
import { RegisterUserType } from "../types/UserTypes"
import { Document, Types } from "mongoose"

// Types
interface AuthenticatedUserId extends Request {
    userId: string | JwtPayload | null
}

interface AuthenticatedUser extends Request {
    user:
        | (Document<unknown, {}, RegisterUserType> &
              Omit<
                  RegisterUserType & {
                      _id: Types.ObjectId
                  },
                  never
              >)
        | null
}

// Require authentication
const requireAuth = (
    req: AuthenticatedUserId,
    res: Response,
    next: NextFunction
) => {
    try {
        const authToken: string = req.cookies["auth-token"]
        if (authToken) {
            const decodedToken = jwt.verify(authToken, JWT_SECRET)
            req.userId = decodedToken
            next()
        } else {
            req.userId = null
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal Server Error!" })
        return
    }
}

// check if user is authenticated
const checkUser = async (
    req: AuthenticatedUser,
    res: Response<any, Record<string, any>>,
    next: NextFunction
) => {
    try {
        const authToken: string = req.cookies["auth-token"]
        if (authToken) {
            const decodedToken = jwt.verify(authToken, JWT_SECRET)
            const user = await User.findById(decodedToken)
            req.user = user
            res.locals.user = user
            next()
        } else {
            res.locals.user = null
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal Server Error!" })
        return
    }
}

export { checkUser, requireAuth }
