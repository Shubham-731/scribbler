import { Request, Response } from "express"
import Post from "../models/Post"
import { PostDocumentType } from "../types/PostTypes"

const getBlogsByTag = async (req: Request, res: Response): Promise<void> => {
    try {
        // Pagination props
        const pageSize = 3
        const page: number = parseInt(req.query.page?.toString() || "1")
        const skip = (page - 1) * pageSize

        // Get tag
        const tag: string = req.params.tag.toString()
        if (!tag) {
            res.status(400).json({
                msg: "Tag not found!",
            })
            return
        }

        // Get blogs by tag
        const totalBlogs: number = await Post.countDocuments({ tags: tag })
        const blogs: PostDocumentType[] = await Post.find({ tags: tag })
            .sort({
                createdAt: -1,
            })
            .skip(skip)
            .limit(pageSize)

        // Send success response
        res.status(200).json({
            msg: "Blogs found!",
            blogs,
            currentPage: page,
            totalPages: totalBlogs,
        })
    } catch (error) {
        console.log(error)
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg,
        })
    }
}

const getTags = async (req: Request, res: Response): Promise<void> => {
    try {
        const tags = await Post.distinct("tags")
        res.json({ msg: "Tags found!", tags })
    } catch (error) {
        console.log(error)
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg,
        })
    }
}

export { getBlogsByTag, getTags }