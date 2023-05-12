import { Request, Response } from "express"
import Post from "../models/Post"
import slugify from "slugify"
import { PostRequestBody } from "../types/PostTypes"
import createDOMPurify from "dompurify"
import { JSDOM } from "jsdom"
import { PostType, PostDocumentType } from "../types/PostTypes"
import User from "../models/User"

interface PostResponse {
    msg: string
    slug?: string
}

const getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        // Check if authenticated
        if (!req.currentUser) {
            res.status(401).json({
                msg: `Unauthorized request!`,
            })

            return
        }

        // Pagination props
        const pageSize = 3
        const page: number = parseInt(req.query.page?.toString() || "1")
        const skip = (page - 1) * pageSize

        // Get posts
        const author = await User.findOne({ email: req.currentUser.email })
        const totalPosts = await Post.countDocuments({
            authorId: author?._id.toString(),
        })
        const posts: PostDocumentType[] = await Post.find({
            authorId: author?._id.toString(),
        })
            .sort({
                createdAt: -1,
            })
            .skip(skip)
            .limit(pageSize)

        // Send success response
        res.status(200).json({
            msg: "Posts found!",
            posts,
            currentPage: page,
            totalPages: totalPosts,
        })
    } catch (error) {
        console.log(error)
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg.toString(),
        })
    }
}

const createPost = async (
    req: Request,
    res: Response<PostResponse>
): Promise<void> => {
    try {
        // Check if user exits
        if (req.currentUser) {
            // Get request body
            const { title, tags, description, content }: PostRequestBody =
                req.body

            // Create slug
            const slug = slugify(title, {
                replacement: "-",
                trim: true,
                lower: true,
            })

            // Check if slug exists
            const existedPost = await Post.findOne({ slug })
            if (existedPost) {
                res.status(409).json({ msg: "Please change title!" })
                return
            }

            // Sanitize html content
            const window = new JSDOM("").window
            const DOMPurify = createDOMPurify(window)
            const sanitizedContent = DOMPurify.sanitize(content, {
                USE_PROFILES: { html: true },
            })

            const postPayload: PostType = {
                title,
                description,
                tags,
                content: sanitizedContent,
                slug,
                authorName: req.currentUser.fullName,
                authorId: req.currentUser._id.toString(),
            }

            // Create post
            const newPost: PostDocumentType = await Post.create(postPayload)

            // Send created response
            res.status(201).json({
                msg: "Post created!",
                slug: newPost.slug,
            })
        } else {
            res.status(401).json({
                msg: `Unauthorized request!`,
            })
        }
    } catch (error) {
        console.log(error)
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg.toString(),
        })
    }
}

const updatePost = async (
    req: Request,
    res: Response<PostResponse>
): Promise<void> => {
    try {
        // Check if user exists
        if (req.currentUser) {
            // Get Post slug from
            const slug: string = req.params.slug

            // Check if post exists
            const oldPost = await Post.findOne({ slug })
            if (!oldPost) {
                res.status(404).json({ msg: "Post not found!" })
                return
            }

            // Get request body
            const { title, tags, description, content }: PostRequestBody =
                req.body

            // Update slug
            const updatedSlug: string = slugify(title, {
                replacement: "-",
                trim: true,
                lower: true,
            })

            // Sanitize html content
            const window = new JSDOM("").window
            const DOMPurify = createDOMPurify(window)
            const sanitizedUpdatedCotent = DOMPurify.sanitize(content, {
                USE_PROFILES: { html: true },
            })

            // Update post
            await Post.updateOne(
                { slug },
                {
                    $set: {
                        title,
                        tags,
                        description,
                        content: sanitizedUpdatedCotent,
                        slug: updatedSlug,
                    },
                }
            )

            // Send success response
            res.status(200).json({
                msg: "Post updated!",
                slug: updatedSlug,
            })
        } else {
            res.status(401).json({
                msg: `Unauthorized request!`,
            })
        }
    } catch (error) {
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg.toString(),
        })
    }
}

const deletePost = async (
    req: Request,
    res: Response<PostResponse>
): Promise<void> => {
    try {
        // for unauthorized user
        if (!req.currentUser) {
            res.status(401).json({
                msg: `Unauthorized request!`,
            })
            return
        }

        // Get slug in req params
        const slug: string = req.params.slug

        // Check if post exists
        const oldPost = await Post.findOne({ slug })
        if (!oldPost) {
            res.status(404).json({ msg: "Post not found!" })
            return
        }

        // Delete post
        await Post.deleteOne({ slug })

        // Send success response
        res.status(200).json({
            msg: "Post deleted!",
        })
    } catch (error) {
        const errorMsg = error instanceof Error && error.message
        res.status(500).json({
            msg: errorMsg.toString(),
        })
    }
}

export { createPost, updatePost, deletePost, getPosts }
