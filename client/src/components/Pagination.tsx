import Link from "next/link"

interface ComponentProps {
    totalPages: number
    currentPage: number
    pathname: string
}

const Pagination = ({ totalPages, currentPage, pathname }: ComponentProps) => {
    const pageNo: number = parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE || "5")

    return (
        <section className="flex items-center justify-between flex-wrap">
            <Link
                href={
                    currentPage === 1
                        ? "#"
                        : `${pathname}?page=${currentPage - 1}`
                }
                className={`text-sm md:text-base ${
                    currentPage === 1 && "opacity-75 cursor-not-allowed"
                } text-[var(--color-primary)] hover:scale-105 border border-solid border-[var(--color-primary)] rounded-md py-1 px-2 md:px-3 transition-all duration-200 ease-linear`}
            >
                &larr; Previous
            </Link>

            <p className="flex-grow w-fit text-center">
                {currentPage} of {Math.ceil(totalPages / pageNo) || 1}
            </p>

            <Link
                href={
                    currentPage * pageNo >= totalPages
                        ? "#"
                        : `${pathname}?page=${currentPage + 1}`
                }
                className={`text-sm md:text-base text-[var(--color-primary)] hover:scale-105 border border-solid border-[var(--color-primary)] rounded-md py-1 px-2 md:px-3 transition-all duration-200 ease-linear ${
                    currentPage * pageNo >= totalPages &&
                    "opacity-75 cursor-not-allowed"
                }`}
            >
                Next &rarr;
            </Link>
        </section>
    )
}

export default Pagination
