interface PostRequestBody {
    title: string
    description: string
    tags: String[]
    content: string
}

interface PostType extends PostRequestBody {
    slug: string
    authorName: string
    authorId: string
}

interface PostDocumentType extends PostType, Document {}

export { PostType, PostRequestBody, PostDocumentType }
