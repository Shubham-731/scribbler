import BlogPreview from "@/components/BlogPreview"
import Pagination from "@/components/Pagination"
import SearchArticle from "@/components/SearchArticle"
import axios, { AxiosError } from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import { useEffect } from "react"
import useSWR, { SWRResponse } from "swr"

interface ResponseData {
    blogs: PostDocumentType[]
    currentPage: number
    totalPages: number
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const Blogs = () => {
    const {
        query: { page: pageNumber },
    } = useRouter()
    const pathname = useRouter().pathname

    const { data, error, isLoading }: SWRResponse<ResponseData, AxiosError> =
        useSWR(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs/latest?page=${
                pageNumber || 1
            }`,
            fetcher
        )

    console.log({ data, error, isLoading })

    const [filteredBlogs, setFilteredBlogs] = useState<PostDocumentType[]>([])
    const [searchQuery, setSearchQuery] = useState("")

    // Rerender the page on currentPage change
    useEffect(() => {
        if (!isLoading && data) {
            setFilteredBlogs(data.blogs)
        }

        console.log(error)
    }, [pageNumber, isLoading])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase()

        const filtered = data?.blogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(query) ||
                blog.description.toLowerCase().includes(query) ||
                (typeof blog.tags === "object" &&
                    blog.tags.some((tag) => tag.toLowerCase().includes(query)))
        )

        setSearchQuery(query)
        if (filtered) setFilteredBlogs(filtered)
    }

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

                {isLoading ? (
                    <p className="text-center my-10 text-[var(--color-secondary)]">
                        Fetching blogs...
                    </p>
                ) : (
                    <>
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

                        <Pagination
                            currentPage={data?.currentPage || 1}
                            totalPages={data?.totalPages || 1}
                            pathname={pathname}
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default Blogs
