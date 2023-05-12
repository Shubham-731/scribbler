import BlogContent from "@/components/BlogContent"
import axios from "axios"
import { toast } from "react-hot-toast"

interface PageProps {
    blog: PostDocumentType
}

const BlogBySlug = ({ blog }: PageProps) => {
    if (!blog) {
        toast.error("Blog not found!")

        return (
            <p className="text-center md:text-lg text-[var(--color-primary)] mt-20">
                Blog not found!
            </p>
        )
    }

    return (
        <section className="py-5 space-y-4">
            <div className="space-y-1 text-center pb-3 md:pb-5 border-b w-full border-b-black/50 dark:border-b-white/50">
                <p className="dark:text-white/50 text-black/50 text-sm md:text-base">
                    August 7, 2021
                </p>
                <h1 className="font-bold capitalize text-xl mb-1 md:text-2xl lg:text-3xl xl:text-4xl text-black/90 dark:text-white/90">
                    {blog.title}
                </h1>
            </div>

            {/* Content */}
            <BlogContent content={blog.content} />
        </section>
    )
}

export default BlogBySlug

export const getServerSideProps = async ({
    query,
}: {
    query: { slug: string }
}) => {
    try {
        const slug = query.slug

        // Get blogs by slug
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs/${slug}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        const { blog }: PageProps = res.data

        return {
            props: {
                blog,
            },
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                blog: null,
            },
        }
    }
}
