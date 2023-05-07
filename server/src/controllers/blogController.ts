import { Request, Response } from "express"
import Post from "../models/Post"
import { PostDocumentType } from "../types/PostTypes"

const getLatestBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogs: PostDocumentType[] = await Post.find({}).sort({
            createdAt: -1,
        })

        res.status(200).json({
            msg: "Blogs found!",
            blogs,
        })
    } catch (error) {
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg,
        })
    }
}

const getBlogsByTag = async (req: Request, res: Response): Promise<void> => {
    try {
        res.send(`Blogs by tag: ${req.query.tag}`)
    } catch (error) {
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg,
        })
    }
}

const getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
        res.send(`Blog by slug: ${req.params.slug}`)
    } catch (error) {
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg,
        })
    }
}

export { getLatestBlogs, getBlogsByTag, getBlogBySlug }
