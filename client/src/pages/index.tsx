import BlogPreview from "@/components/BlogPreview"
import Heading from "@/components/Heading"
import Link from "next/link"
import axios, { AxiosError } from "axios"
import Head from "next/head"
import useSWR, { SWRResponse } from "swr"

interface ResponseData {
    blogs: PostDocumentType[]
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export default function Home() {
    const { data, error, isLoading }: SWRResponse<ResponseData, AxiosError> =
        useSWR(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs/latest`,
            fetcher
        )

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

                {isLoading ? (
                    <p className="text-center my-10 text-[var(--color-secondary)]">
                        Fetching blogs...
                    </p>
                ) : (
                    <>
                        <section className="divide-y dark:divide-white/50 divide-black/50 space-y-3">
                            {data?.blogs.length ? (
                                data?.blogs.map((blog, i) => (
                                    <>
                                        <BlogPreview
                                            editable={false}
                                            content={blog}
                                            key={blog.slug}
                                        />
                                    </>
                                ))
                            ) : (
                                <p className="text-center text-[var(--color-primary)]">
                                    No posts found!
                                </p>
                            )}
                        </section>

                        <Link
                            href={"/blogs"}
                            className="text-right w-fit block ml-auto text-[var(--color-primary)] hover:tracking-wide border border-solid border-[var(--color-primary)] rounded-md py-1 px-3 transition-all duration-200 ease-linear"
                        >
                            All blogs &rarr;
                        </Link>
                    </>
                )}
            </div>
        </>
    )
}
