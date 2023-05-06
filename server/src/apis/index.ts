import express, { Router } from "express"
import authRoutes from "../routes/authRoutes"
import blogRoutes from "../routes/blogRoutes"

const router: Router = express.Router()

// Authentication routes
router.use("/auth", authRoutes)

// Blog routes
router.use("/blogs", blogRoutes)

// API routes
export default router
