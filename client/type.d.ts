interface UserInputType {
    fullName?: string
    email: string
    password: string
}

interface AuthenticatedUserType {
    fullName: string
    email: string
}

interface PostRequestBody {
    title: string
    description: string
    tags: string[] | string
    content: string
}

interface PostType extends PostRequestBody {
    slug: string
    authorName: string
    authorId: string
    createdAt: Date
    updatedAt: Date
}

interface PostDocumentType extends PostType, Document {}
