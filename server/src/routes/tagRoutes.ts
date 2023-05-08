import express, { Router } from "express"
import { getBlogsByTag, getTags } from "../controllers/tagControllers"

const router: Router = express.Router()

// @route - GET /api/tags
// @desc - Returns distinct tags from all documents
router.get("/", getTags)

// @route - GET /api/tags/:tag
// @desc - Returns the blogs by tag
router.get("/:tag", getBlogsByTag)

export default router
