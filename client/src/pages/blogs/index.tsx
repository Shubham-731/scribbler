import BlogPreview from "@/components/BlogPreview"
import Pagination from "@/components/Pagination"
import SearchArticle from "@/components/SearchArticle"
import axios from "axios"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import { useEffect } from "react"

interface PageProps {
    blogs: PostDocumentType[]
    currentPage: number
    totalPages: number
}

const Blogs = ({ blogs, currentPage, totalPages }: PageProps) => {
    const [filteredBlogs, setFilteredBlogs] = useState(blogs)
    const [searchQuery, setSearchQuery] = useState("")

    // Rerender the page on currentPage change
    useEffect(() => {
        setFilteredBlogs(blogs)
    }, [currentPage])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase()

        const filtered = blogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(query) ||
                blog.description.toLowerCase().includes(query) ||
                (typeof blog.tags === "object" &&
                    blog.tags.some((tag) => tag.toLowerCase().includes(query)))
        )

        setSearchQuery(query)
        setFilteredBlogs(filtered)
    }

    const pathname = useRouter().pathname

    return (
        <>
            <Head>
                <title>All Posts - Scribbler</title>
            </Head>

            <div className="py-5 space-y-4">
                {/* Search article */}
                <SearchArticle
                    title="all posts"
                    value={searchQuery}
                    handleChange={handleSearch}
                />

                {/* Blogs */}
                <section className="divide-y dark:divide-white/50 divide-black/50 space-y-3">
                    {filteredBlogs.length ? (
                        filteredBlogs.map((blog, i) => (
                            <BlogPreview
                                editable={false}
                                content={blog}
                                key={i}
                            />
                        ))
                    ) : (
                        <p className="text-center text-[var(--color-secondary)] my-10">
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
        </>
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
                totalPages: 1,
                currentPage: 1,
            },
        }
    }
}
