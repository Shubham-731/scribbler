interface PostRequestBody {
    title: string
    description: string
    tags: string[]
    content: string
}

interface PostType extends PostRequestBody {
    slug: string
    authorName: string
    authorId: string
}

interface PostDocumentType extends PostType, Document {
    createdAt: string
    updatedAt: string
}

export { PostType, PostRequestBody, PostDocumentType }
