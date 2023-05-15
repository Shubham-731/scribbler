import { Request, Response } from "express"
import Post from "../models/Post"
import { PostDocumentType } from "../types/PostTypes"
import { formatPostData } from "../utils/format"
import { PAGE_SIZE } from "../config/env"

interface Tags {
    count: number
    tag: string
}

const getBlogsByTag = async (req: Request, res: Response): Promise<void> => {
    try {
        // Pagination props
        const pageSize = PAGE_SIZE
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
            blogs: formatPostData(blogs),
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
        const tags: Tags[] = await Post.aggregate([
            { $unwind: "$tags" }, // break down the array into separate documents
            { $group: { _id: "$tags", count: { $sum: 1 } } }, // group by tag and count occurrences
            { $project: { _id: 0, tag: "$_id", count: 1 } }, // format the output
        ])
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
