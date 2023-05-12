import express, { Router } from "express"
import {
    createPost,
    updatePost,
    deletePost,
    getPosts,
} from "../controllers/postControllers"
import checkUser from "../middlewares/authMiddleware"

const router: Router = express.Router()

// @route - POST - /api/posts/
// @desc - Returns the latest blogs
router.get("/", checkUser, getPosts)

// @route - POST - /api/posts/
// @desc - Returns the latest blogs
router.post("/", checkUser, createPost)

// @route - PUT - /api/posts/:slug
// @desc - Returns the latest blogs
router.put("/:slug", checkUser, updatePost)

// @route - DELETE - /api/posts/:slug
// @desc - Returns the latest blogs
router.delete("/:slug", checkUser, deletePost)

export default router
