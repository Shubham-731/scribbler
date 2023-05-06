import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { JWT_SECRET } from "../config/env"
import User from "../models/User"
import { SendUserType, UserDocument } from "../types/UserTypes"

declare global {
    namespace Express {
        interface Request {
            currentUser: UserDocument
        }
    }
}

const checkUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.cookies["auth-token"]

        if (authToken) {
            const decodedToken: SendUserType | string | JwtPayload = jwt.verify(
                authToken,
                JWT_SECRET
            )

            if (typeof decodedToken !== "string") {
                const user = await User.findOne({ email: decodedToken.email })
                if (user) {
                    req.currentUser = user
                    res.locals.user = user
                    next()
                } else {
                    res.locals.user = null
                    next()
                }
            } else {
                res.locals.user = null
                next()
            }
        } else {
            res.locals.user = null
            next()
        }
    } catch (error) {
        console.log(error)
        res.locals.user = null
        next()
    }
}

export default checkUser
