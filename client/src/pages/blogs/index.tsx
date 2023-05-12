import BlogPreview from "@/components/BlogPreview"
import Pagination from "@/components/Pagination"
import SearchArticle from "@/components/SearchArticle"
import axios from "axios"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

interface PageProps {
    blogs: PostDocumentType[]
    currentPage: number
    totalPages: number
}

const Blogs = ({ blogs, currentPage, totalPages }: PageProps) => {
    const pathname = useRouter().pathname

    return (
        <div className="py-5 space-y-4">
            {/* Search article */}
            <SearchArticle title="all posts" />

            {/* Blogs */}
            <section className="divide-y dark:divide-white/50 divide-black/50 space-y-3">
                {blogs.length ? (
                    blogs.map((blog, i) => (
                        <BlogPreview editable={false} content={blog} key={i} />
                    ))
                ) : (
                    <p className="text-center text-[var(--color-secondary)]">
                        No articles found!
                    </p>
                )}
            </section>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pathname={pathname}
            />
        </div>
    )
}

export default Blogs

export const getServerSideProps: GetServerSideProps<PageProps> = async (
    content
) => {
    try {
        const { query } = content
        const pageNumber = parseInt(query.page?.toString() || "1")

        // Get latest blogs
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs/latest?page=${pageNumber}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        const { blogs, currentPage, totalPages }: PageProps = res.data

        return {
            props: {
                blogs,
                currentPage,
                totalPages,
            },
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                blogs: [],
                totalPages: 0,
                currentPage: 1,
            },
        }
    }
}
