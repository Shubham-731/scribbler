import BlogPreview from "@/components/BlogPreview"
import Pagination from "@/components/Pagination"
import SearchArticle from "@/components/SearchArticle"
import axios from "axios"
import { GetServerSideProps } from "next"
import Head from "next/head"

interface PageProps {
    blogs: PostDocumentType[]
    currentPage: number
    totalPages: number
    tag: string
}

const ArticlesByTag = ({ blogs, currentPage, totalPages, tag }: PageProps) => {
    return (
        <>
            <Head>
                <title>
                    {tag.toUpperCase().replaceAll("-", " ")} - Scribbler
                </title>
            </Head>

            <div className="py-5 space-y-4">
                {/* Search article */}
                <SearchArticle title={tag} />

                {/* Blogs */}
                <section className="divide-y dark:divide-white/50 divide-black/50 space-y-3">
                    {blogs.length ? (
                        blogs.map((blog, i) => (
                            <BlogPreview
                                editable={false}
                                content={blog}
                                key={i}
                            />
                        ))
                    ) : (
                        <p className="text-center text-[var(--color-secondary)]">
                            Posts not found anymore!
                        </p>
                    )}
                </section>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pathname={`/tags/${tag}`}
                />
            </div>
        </>
    )
}

export default ArticlesByTag

export const getServerSideProps: GetServerSideProps<PageProps> = async (
    context
) => {
    const { query } = context
    const { page: pageNumber, tag } = query

    try {
        // Get latest blogs
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tags/${tag}?page=${
                pageNumber || 1
            }`,
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
                tag: tag?.toString() || "",
            },
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                blogs: [],
                totalPages: 0,
                currentPage: 1,
                tag: tag?.toString() || "",
            },
        }
    }
}
