import jwt, { JwtPayload } from "jsonwebtoken"
import { SendUserType } from "../types/UserTypes"
import { JWT_SECRET } from "../config/env"

const generateToken = (payload: SendUserType): string => {
    const token = jwt.sign(payload, JWT_SECRET)
    return token
}

const verifyToken = (token: string): JwtPayload | string | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        if (decoded) {
            return decoded
        }

        return null
    } catch (error) {
        throw error
    }
}

export { generateToken, verifyToken }
