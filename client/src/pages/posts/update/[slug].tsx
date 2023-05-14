import Heading from "@/components/Heading"
import PostForm from "@/components/PostForm"
import { useAuth } from "@/providers/AuthProvider"
import { formatPostPayload } from "@/utils/format"
import axios, { AxiosError, AxiosResponse } from "axios"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { toast } from "react-hot-toast"

interface PageProps {
    blog: PostDocumentType | null
    slug: string
}

interface PostResponse {
    msg: string
    slug: string
}

const EditPost = ({ blog, slug }: PageProps) => {
    // For authenticated user only
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push("/")
        }
    }, [user])

    // IF blog / slug is not defined
    useEffect(() => {
        if (!blog || !slug) {
            router.push("/")
            toast.error("Post not found!")
        }
    }, [blog, slug])

    const updatePost = async (values: PostRequestBody) => {
        try {
            const { title, description, tags, content } =
                formatPostPayload(values)

            const res: AxiosResponse<PostResponse, PostRequestBody> =
                await axios.put(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${slug}`,
                    {
                        title,
                        description,
                        tags,
                        content,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                )

            if (res.status === 200) {
                toast.success(res.data.msg)
                router.push(`/blogs/${res.data.slug}`)
            } else {
                toast.error("Some error occured!")
            }
        } catch (error) {
            console.log(error)
            const errorResponseMsg: { msg: string } =
                error instanceof AxiosError && error.response?.data
            if (errorResponseMsg) {
                toast.error(errorResponseMsg.msg)
            }
        }
    }

    return (
        <>
            <Head>
                <title>Update Post - Scribbler</title>
            </Head>

            <section className="my-3 md:my-6 space-y-10 relative w-full">
                <Heading
                    title="update post"
                    desc="Update your post to reach out to more audience!"
                />

                {/* New post */}
                <PostForm
                    btnText="Update"
                    formHandler={updatePost}
                    values={blog || undefined}
                />
            </section>
        </>
    )
}

export default EditPost

export const getServerSideProps: GetServerSideProps<PageProps> = async (
    context
) => {
    const slug = context.params?.slug?.toString() as string

    try {
        // Get blogs by slug
        const res: AxiosResponse<PageProps> = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs/${slug}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        const { blog } = res.data

        return {
            props: {
                blog,
                slug,
            },
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                blog: null,
                slug,
            },
        }
    }
}
