import { Request, Response, Send } from "express"
import User from "../models/User"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/jwt"
import {
    RegisterUserType,
    LoginUserType,
    UserDocument,
    SendUserType,
} from "../types/UserTypes"
import { JWT_SECRET, NODE_ENV } from "../config/env"
import jwt, { JwtPayload } from "jsonwebtoken"

interface AuthenticatedResponse {
    msg: string | false
    user?: SendUserType
}

const sendUser = (user: UserDocument): SendUserType => {
    return {
        fullName: user.fullName,
        email: user.email,
    }
}

// Register user
const registerUser = async (
    req: Request,
    res: Response<AuthenticatedResponse>
): Promise<void> => {
    try {
        const { fullName, email, password }: RegisterUserType = req.body

        // Validate fullName, email and password
        if (!fullName || !email || !password) {
            res.status(403).json({ msg: "Invalid data provided!" })
            return
        }

        // Check if user is already registered
        const user = await User.findOne({ email })
        if (user) {
            res.status(409).json({
                msg: "User already registered!",
            })
            return
        }

        // Encrypt the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Register the user
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
        })

        // Generate JWT token from objectId
        const userPayload = sendUser(newUser)
        const authToken = generateToken(userPayload)

        res.status(201)
            .cookie("auth-token", authToken, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // Set maxage to 1 day
                httpOnly: true,
                secure: NODE_ENV === "PROD",
            })
            .json({ msg: "Successfully registered!", user: sendUser(newUser) })
    } catch (error) {
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg,
        })
    }
}

// Login user
const loginUser = async (
    req: Request,
    res: Response<AuthenticatedResponse>
): Promise<void> => {
    try {
        const { email, password }: LoginUserType = req.body

        // Check if user exist
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({
                msg: "User not found!",
            })
            return
        }

        // Match the password
        const verified = await bcrypt.compare(password, user.password)
        if (!verified) {
            res.status(409).json({
                msg: "Invalid email or password!",
            })
            return
        }

        // Generate JWT token from objectId
        const userPayload: SendUserType = sendUser(user)
        const authToken: string = generateToken(userPayload)

        res.status(200)
            .cookie("auth-token", authToken, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // Set maxage to 1 day
                httpOnly: true,
                secure: NODE_ENV === "PROD",
            })
            .json({ msg: "Successfully logged in!", user: sendUser(user) })
    } catch (error) {
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg,
        })
    }
}

// Logout user
const logoutUser = async (
    req: Request,
    res: Response<AuthenticatedResponse>
) => {
    try {
        res.status(200)
            .cookie("auth-token", "", { maxAge: 1 })
            .json({ msg: "Logout success!" })
    } catch (error) {
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg,
        })
    }
}

// Get user
const getUser = async (
    req: Request,
    res: Response<AuthenticatedResponse>
): Promise<void> => {
    try {
        // Get auth token
        const authToken: string = req.cookies["auth-token"]

        // Check if authToken is present and valid
        if (authToken) {
            const decodedToken: SendUserType | string | JwtPayload = jwt.verify(
                authToken,
                JWT_SECRET
            )

            if (typeof decodedToken !== "string") {
                const user =
                    decodedToken &&
                    (await User.findOne({ email: decodedToken.email }))
                if (!user) {
                    res.status(404).json({
                        msg: "User not found!",
                    })
                    return
                }

                // Send success response
                res.status(200).json({
                    msg: "User found!",
                    user: user && sendUser(user),
                })
            }
        } else {
            // Send an `unauthorized` error
            res.status(401).json({
                msg: "Unauthorized access!",
            })
            return
        }
    } catch (error) {
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg,
        })
    }
}

export { registerUser, loginUser, logoutUser, getUser }
