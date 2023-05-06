import express, { Router } from "express"
import {
    getUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/authControllers"

const router: Router = express.Router()

// @route - /api/auth/register
// @desc - Registers a new user
router.post("/register", registerUser)

// @route - /api/auth/login
// @desc - Login a existing user
router.post("/login", loginUser)

// @route - /api/auth/logout
// @desc - Logout user
router.get("/logout", logoutUser)

// @route - /api/auth/user
router.get("/user", getUser)

export default router
