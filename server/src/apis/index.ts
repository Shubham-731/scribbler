import express, { Router } from "express"
import authRoutes from "../routes/authRoutes"
import blogRoutes from "../routes/blogRoutes"
import postRoutes from "../routes/postRoutes"
import tagRoutes from "../routes/tagRoutes"

const router: Router = express.Router()

// Authentication routes
router.use("/auth", authRoutes)

// Blog routes
router.use("/blogs", blogRoutes)

// Post routes
router.use("/posts", postRoutes)

// Tag routes
router.use("/tags", tagRoutes)

// API routes
export default router
