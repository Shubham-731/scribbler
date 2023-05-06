import { Request, Response } from "express"

const getLatestBlogs = async (req: Request, res: Response) => {
    try {
        res.send("Latest blogs")
    } catch (error) {
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg,
        })
    }
}

const getBlogsByTag = async (req: Request, res: Response) => {
    try {
        res.send(`Blogs by tag: ${req.query.tag}`)
    } catch (error) {
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg,
        })
    }
}

const getBlogBySlug = async (req: Request, res: Response) => {
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
