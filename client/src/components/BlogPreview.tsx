import Link from "next/link"
import { useAuth } from "@/providers/AuthProvider"
import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-hot-toast"

const BlogPreview = ({
    editable,
    content,
    setRefreshKey,
}: {
    editable: boolean
    content: PostDocumentType
    setRefreshKey?: (newVal: number) => void
}) => {
    const { user } = useAuth()

    const handleDeletePost = async (slug: string) => {
        if (!slug) {
            toast.error("Invalid slug!")
        }

        const confirmed = confirm("Are you sure to delete this post?")
        if (confirmed) {
            try {
                const response: AxiosResponse<{ msg: string }> =
                    await axios.delete(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${slug}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                            withCredentials: true,
                        }
                    )

                if (response.status === 200) {
                    toast.success("Post successfully deleted!")
                    setRefreshKey && setRefreshKey(Math.random())
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
    }

    return (
        <div className="flex flex-col md:flex-row gap-2 py-4 px-1">
            <div className="min-w-[14rem] md:space-y-1 text-sm md:text-base">
                <p className="text-black/60 dark:text-white/60 leading-5 md:leading-6">
                    <span className="text-black/75 dark:text-white/75 font-semibold">
                        Date:{" "}
                    </span>
                    {new Date(content.createdAt).toDateString()}
                </p>
                <p className="text-black/60 dark:text-white/60 leading-5 md:leading-6">
                    <span className="text-black/75 dark:text-white/75 font-semibold">
                        Author:{" "}
                    </span>
                    {content.authorName}
                </p>
            </div>

            <div className="w-full space-y-2">
                <Link href={`/blogs/${content.slug}`}>
                    <h2 className="text-lg md:text-xl leading-5 md:leading-7 dark:text-white/90 text-black/90 font-semibold cursor-pointer hover:text-black dark:hover:text-white">
                        {content.title}
                    </h2>
                </Link>
                <div className="flex flex-wrap gap-5">
                    {typeof content.tags === "object" &&
                        content.tags.map((tag) => (
                            <Link href={`/tags/${tag}`} key={tag}>
                                <button className="uppercase text-[var(--color-secondary)] hover:scale-105 transition-all duration-200 ease-linear">
                                    {tag}
                                </button>
                            </Link>
                        ))}
                </div>
                <p className="text-sm text-black/60 dark:text-white/60 md:text-[0.95rem] md:leading-[1.15rem] leading-4 ellipsis">
                    {content.description}
                </p>

                <div
                    className="flex items-center gap-2 md:gap-3"
                    style={{ marginTop: "1rem" }}
                >
                    <button>
                        <Link
                            href={`/blogs/${content.slug}`}
                            className="text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white border border-solid border-[var(--color-primary)] rounded-md py-1 px-3 transition-all duration-200 ease-linear text-sm md:text-base"
                        >
                            Read more
                        </Link>
                    </button>

                    {user && editable && (
                        <>
                            <button>
                                <Link
                                    href={`/posts/update/${content.slug}`}
                                    className="text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white border border-solid border-[var(--color-secondary)] rounded-md py-1 px-3 transition-all duration-200 ease-linear text-sm md:text-base"
                                >
                                    Edit
                                </Link>
                            </button>

                            <button
                                className="text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white border border-solid border-[var(--color-secondary)] rounded-md py-1 px-3 transition-all duration-200 ease-linear text-sm md:text-base"
                                onClick={() => handleDeletePost(content.slug)}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BlogPreview
