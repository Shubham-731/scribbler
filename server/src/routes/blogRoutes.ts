import express, { Router } from "express"
import { getBlogBySlug, getLatestBlogs } from "../controllers/blogController"

const router: Router = express.Router()

// @route - GET /api/blogs/latest
// @desc - Returns the latest blogs
router.get("/latest", getLatestBlogs)

// @route - GET /api/blogs/:slug
// @desc - Returns the latest blogs
router.get("/:slug", getBlogBySlug)

export default router
