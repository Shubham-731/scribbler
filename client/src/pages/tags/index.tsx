import Link from "next/link"

const Tags = () => {
    return (
        <section className="mt-20 md:mt-40 flex max-w-2xl mx-auto flex-col md:flex-row items-center justify-center gap-5">
            <h1 className="font-bold md:border-r-2 p-5 md:border-b-0 border-b-2 border-black/75 dark:border-white/75 text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black dark:text-white w-fit">
                Tags
            </h1>

            <div className="flex gap-3 flex-wrap items-center justify-center md:justify-normal">
                <button className="hover:scale-105 transition-all duration-200 ease-linear">
                    <Link
                        href={"/tags/next-js"}
                        className="uppercase text-[var(--color-primary)] dark:text-[var(--color-secondary)]"
                    >
                        next-js
                    </Link>{" "}
                    (5)
                </button>
                <button className="hover:scale-105 transition-all duration-200 ease-linear">
                    <Link
                        href={"/tags/tailwind-css"}
                        className="uppercase text-[var(--color-primary)] dark:text-[var(--color-secondary)]"
                    >
                        tailwind-css
                    </Link>{" "}
                    (5)
                </button>
                <button className="hover:scale-105 transition-all duration-200 ease-linear">
                    <Link
                        href={"/tags/javascript"}
                        className="uppercase text-[var(--color-primary)] dark:text-[var(--color-secondary)]"
                    >
                        javascript
                    </Link>{" "}
                    (5)
                </button>
            </div>
        </section>
    )
}

export default Tags
