import { PostDocumentType } from "../types/PostTypes"

interface RequiredPostData {
    title: string
    tags: string[]
    description: string
    createdAt: string
    authorName: string
    slug: string
}

function formatPostData(posts: PostDocumentType[]): RequiredPostData[] {
    const result: RequiredPostData[] = posts.map((post) => ({
        title: post.title,
        tags: post.tags,
        description: post.description,
        createdAt: post.createdAt,
        authorName: post.authorName,
        slug: post.slug,
    }))

    return result
}

export { formatPostData }
