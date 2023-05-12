import axios from "axios"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"

interface PageProps {
    tags:
        | [
              {
                  count: number
                  tag: string
              }
          ]
        | []
}

const Tags = ({ tags }: PageProps) => {
    return (
        <>
            <Head>
                <title>Tags - Scribbler</title>
            </Head>

            <section className="mt-20 md:mt-40 flex max-w-2xl mx-auto flex-col md:flex-row items-center justify-center gap-5">
                <h1 className="font-bold md:border-r-2 p-5 md:border-b-0 border-b-2 border-black/75 dark:border-white/75 text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black dark:text-white w-fit">
                    Tags
                </h1>

                <div className="flex gap-3 flex-wrap items-center justify-center md:justify-normal">
                    {tags.length ? (
                        tags.map((tagObj) => (
                            <p
                                className="hover:scale-105 transition-all duration-200 ease-linear"
                                key={tagObj.tag}
                            >
                                <Link
                                    href={`/tags/${tagObj.tag}`}
                                    className="uppercase text-[var(--color-primary)] dark:text-[var(--color-secondary)] hover:scale-105 transition-all duration-200 ease-linear"
                                >
                                    {tagObj.tag}
                                </Link>{" "}
                                ({tagObj.count})
                            </p>
                        ))
                    ) : (
                        <p className="text-center text-[var(--color-secondary)]">
                            No tags found!
                        </p>
                    )}
                </div>
            </section>
        </>
    )
}

export default Tags

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
    try {
        // Get latest blogs
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tags`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        const { tags }: PageProps = res.data

        return {
            props: {
                tags,
            },
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                tags: [],
            },
        }
    }
}
