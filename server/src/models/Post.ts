import mongoose, { Schema } from "mongoose"
import { PostDocumentType } from "../types/PostTypes"

const postSchema = new Schema<PostDocumentType>(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: String,
                required: true,
            },
        ],
        content: {
            type: String,
            required: true,
        },
        authorName: {
            type: String,
            required: true,
        },
        authorId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const Post =
    mongoose.models.Post || mongoose.model<PostDocumentType>("Post", postSchema)

export default Post
