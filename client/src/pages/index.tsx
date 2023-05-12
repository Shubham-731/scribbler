import BlogPreview from "@/components/BlogPreview"
import Heading from "@/components/Heading"
import Link from "next/link"
import { GetServerSideProps } from "next"
import axios from "axios"
import Head from "next/head"

interface PageProps {
    blogs: PostDocumentType[]
}

export default function Home({ blogs }: PageProps) {
    return (
        <>
            <Head>
                <title>Latest blogs - Scribblers</title>
            </Head>

            <div className="py-5 space-y-4">
                <Heading
                    title="latest blogs"
                    desc="Here're some latest blog posts you can browse for free!"
                />

                {/* Blogs */}
                <section className="divide-y dark:divide-white/50 divide-black/50 space-y-3">
                    {blogs.length ? (
                        blogs.map((blog, i) => (
                            <BlogPreview
                                editable={false}
                                content={blog}
                                key={blog.slug}
                            />
                        ))
                    ) : (
                        <p className="text-center text-[var(--color-secondary)]">
                            No posts found!
                        </p>
                    )}
                </section>

                {/* All blogs */}
                <Link
                    href={"/blogs"}
                    className="text-right w-fit block ml-auto text-[var(--color-primary)] hover:tracking-wide border border-solid border-[var(--color-primary)] rounded-md py-1 px-3 transition-all duration-200 ease-linear"
                >
                    All blogs &rarr;
                </Link>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
    try {
        // Get latest blogs
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs/latest`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        const { blogs }: PageProps = res.data

        return {
            props: {
                blogs,
            },
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                blogs: [],
            },
        }
    }
}
