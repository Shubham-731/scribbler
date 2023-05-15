import BlogPreview from "@/components/BlogPreview"
import Heading from "@/components/Heading"
import { useAuth } from "@/providers/AuthProvider"
import axios, { AxiosError, AxiosResponse } from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/router"
import Pagination from "@/components/Pagination"
import Head from "next/head"

interface PageProps {
    posts: PostDocumentType[]
    currentPage: number
    totalPages: number
}

const MyPosts = () => {
    const [posts, setPosts] = useState<PostDocumentType[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [refreshKey, setRefreshKey] = useState(0)

    const { user } = useAuth()

    const router = useRouter()
    const { page: pageNumber } = router.query

    useEffect(() => {
        const getPosts = async (url: string) => {
            try {
                const response: AxiosResponse<PageProps> = await axios.get(
                    url,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                )

                if (response.status === 200) {
                    setPosts(response.data.posts)
                    setCurrentPage(response.data.currentPage)
                    setTotalPages(response.data.totalPages)
                }
            } catch (error) {
                const errorResponseMsg: { msg: string } =
                    error instanceof AxiosError && error.response?.data
                if (errorResponseMsg) {
                    toast.error(errorResponseMsg.msg)
                }
                console.log(error)
            }
        }

        getPosts(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/?page=${
                pageNumber || 1
            }`
        )
    }, [pageNumber, refreshKey])

    return (
        <>
            <Head>
                <title>Your Posts - Scribbler</title>
            </Head>

            <section className="my-3 md:my-6 space-y-10 w-full">
                <Heading title="Your posts">
                    <div className="text-sm md:text-base text-center w-full">
                        <Link
                            href="/posts/new"
                            className="text-[var(--color-primary)] capitalize underline hover:no-underline font-bold"
                        >
                            Create new post
                        </Link>
                    </div>
                </Heading>

                {/* Replace user with posts */}
                {user ? (
                    <>
                        <section className="divide-y dark:divide-white/50 divide-black/50 space-y-3">
                            {posts.length ? (
                                posts.map((post, i) => (
                                    <BlogPreview
                                        editable={true}
                                        content={post}
                                        key={i}
                                        setRefreshKey={setRefreshKey}
                                    />
                                ))
                            ) : (
                                <p className="text-center text-[var(--color-secondary)]">
                                    You haven&#39;t created any post yet!
                                </p>
                            )}
                        </section>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            pathname={router.pathname}
                        />
                    </>
                ) : (
                    <p className="text-center text-[var(--color-secondary)]">
                        Login to see your posts!
                    </p>
                )}
            </section>
        </>
    )
}

export default MyPosts
