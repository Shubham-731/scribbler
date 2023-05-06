import express, { Router } from "express"
import {
    getBlogBySlug,
    getBlogsByTag,
    getLatestBlogs,
} from "../controllers/blogController"

const router: Router = express.Router()

// @route - /api/blogs/latest
// @desc - Returns the latest blogs
router.get("/latest", getLatestBlogs)

// @route - /api/blogs/:tag
// @desc - Returns the latest blogs
router.get("/", getBlogsByTag)

// @route - /api/blogs/:slug
// @desc - Returns the latest blogs
router.get("/:slug", getBlogBySlug)

export default router
