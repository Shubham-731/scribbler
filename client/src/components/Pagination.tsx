const Pagination = () => {
    return (
        <section className="flex items-center justify-between flex-wrap">
            <button className="text-sm md:text-base opacity-75 cursor-not-allowed text-[var(--color-primary)] hover:scale-105 border border-solid border-[var(--color-primary)] rounded-md py-1 px-2 md:px-3 transition-all duration-200 ease-linear">
                &larr; Previous
            </button>
            <p className="flex-grow w-fit text-center">1 of 2</p>
            <button className="text-sm md:text-base text-[var(--color-primary)] hover:scale-105 border border-solid border-[var(--color-primary)] rounded-md py-1 px-2 md:px-3 transition-all duration-200 ease-linear">
                Next &rarr;
            </button>
        </section>
    )
}

export default Pagination
