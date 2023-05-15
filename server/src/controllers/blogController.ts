import { Request, Response } from "express"
import Post from "../models/Post"
import { PostDocumentType } from "../types/PostTypes"
import { formatPostData } from "../utils/format"

const getLatestBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
        // Pagination props
        const pageSize = 5
        const page: number = parseInt(req.query.page?.toString() || "1")
        const skip = (page - 1) * pageSize

        // Blog mongodb
        const totalBlogs: number = await Post.countDocuments()
        const blogs: PostDocumentType[] = await Post.find({})
            .sort({
                createdAt: -1,
            })
            .skip(skip)
            .limit(pageSize)

        res.status(200).json({
            msg: "Blogs found!",
            blogs: formatPostData(blogs),
            currentPage: page,
            totalPages: totalBlogs,
        })
    } catch (error) {
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg,
        })
    }
}

const getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
        const slug: string = req.params.slug
        if (!slug) {
            res.status(400).json({
                msg: "Please specify slug!",
            })
            return
        }

        const blog: PostDocumentType | null = await Post.findOne({ slug })

        if (!blog) {
            res.status(404).json({
                msg: "Blog not found!",
            })
            return
        }

        res.status(200).json({
            msg: "Blog found!",
            blog,
        })
    } catch (error) {
        console.log(error)
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg,
        })
    }
}

export { getLatestBlogs, getBlogBySlug }
