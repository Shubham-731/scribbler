import Heading from "@/components/Heading"
import PostForm from "@/components/PostForm"
import { formatPostPayload, formatTags } from "@/utils/format"
import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/router"
import Head from "next/head"
import { useAuth } from "@/providers/AuthProvider"
import { useEffect } from "react"

interface PostResponse {
    msg: string
    slug: string
}

const NewPost = () => {
    const router = useRouter()
    const { user } = useAuth()

    useEffect(() => {
        if (!user) {
            router.push("/")
        }
    }, [user])

    async function createNewPost(values: PostRequestBody) {
        try {
            // Format payload
            const { title, description, content, tags } =
                formatPostPayload(values)

            const res: AxiosResponse<PostResponse, PostRequestBody> =
                await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts`,
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

            if (res.status === 201) {
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
                <title>Create new Post - Scribbler</title>
            </Head>

            <section className="my-3 md:my-6 space-y-10 relative w-full">
                <Heading
                    title="create new post"
                    desc="Create a New Post and Share Your Voice!"
                />

                {/* New post */}
                <PostForm btnText="Publish" formHandler={createNewPost} />
            </section>
        </>
    )
}

export default NewPost
