import Link from "next/link"
import { useAuth } from "@/providers/AuthProvider"

const BlogPreview = ({ editable }: { editable: boolean }) => {
    const { user } = useAuth()

    return (
        <div className="flex flex-col md:flex-row gap-2 py-4 px-1">
            <div className="min-w-[12rem] md:space-y-1">
                <p className="text-black/60 dark:text-white/60 leading-5 md:leading-6">
                    <span className="text-black/75 dark:text-white/75 font-semibold">
                        Date:{" "}
                    </span>
                    August 7, 2021
                </p>
                <p className="text-black/60 dark:text-white/60 leading-5 md:leading-6">
                    <span className="text-black/75 dark:text-white/75 font-semibold">
                        Author:{" "}
                    </span>
                    Lorem, ipsum dolor.
                </p>
            </div>
            <div className="w-full space-y-2">
                <Link href={"/blogs/new-feature-in-v1"}>
                    <h2 className="text-lg md:text-xl dark:text-white/90 text-black/90 font-semibold cursor-pointer hover:text-black dark:hover:text-white">
                        New features in v1
                    </h2>
                </Link>
                <div className="flex flex-wrap gap-5">
                    <Link href={`/tags/next-js`}>
                        <button className="uppercase text-[var(--color-secondary)] hover:scale-105 transition-all duration-200 ease-linear">
                            next-js
                        </button>
                    </Link>
                    <Link href={`/tags/tailwind-css`}>
                        <button className="uppercase text-[var(--color-secondary)] hover:scale-105 transition-all duration-200 ease-linear">
                            tailwind-css
                        </button>
                    </Link>
                    <Link href={`/tags/guide`}>
                        <button className="uppercase text-[var(--color-secondary)] hover:scale-105 transition-all duration-200 ease-linear">
                            guide
                        </button>
                    </Link>
                </div>
                <p className="text-sm text-black/60 dark:text-white/60 md:text-[0.95rem] md:leading-[1.15rem] leading-4 ellipsis">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Explicabo a neque nemo consectetur eaque commodi quos sit
                    vero, praesentium ea qui quia molestias. Veniam ipsum
                    dolores delectus quas, sint rem! Magnam, ad?
                </p>

                <div
                    className="flex items-center gap-2 md:gap-3"
                    style={{ marginTop: "1rem" }}
                >
                    {user && editable ? (
                        <>
                            <button>
                                <Link
                                    href={"/blogs/new-feature-in-v1"}
                                    className="text-[var(--color-secondary)] hover:tracking-wide border border-solid border-[var(--color-secondary)] rounded-md py-1 px-3 transition-all duration-200 ease-linear text-sm md:text-base"
                                >
                                    Edit &rarr;
                                </Link>
                            </button>
                            <button>
                                <Link
                                    href={"/blogs/new-feature-in-v1"}
                                    className="text-[var(--color-secondary)] hover:tracking-wide border border-solid border-[var(--color-secondary)] rounded-md py-1 px-3 transition-all duration-200 ease-linear text-sm md:text-base"
                                >
                                    Delete &rarr;
                                </Link>
                            </button>
                        </>
                    ) : (
                        <button>
                            <Link
                                href={"/blogs/new-feature-in-v1"}
                                className="text-[var(--color-primary)] hover:tracking-wide border border-solid border-[var(--color-primary)] rounded-md py-1 px-3 transition-all duration-200 ease-linear text-sm md:text-base"
                            >
                                Read more &rarr;
                            </Link>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BlogPreview
