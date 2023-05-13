import Image from "next/image"
import Heading from "./Heading"
import { ChangeEvent } from "react"

const SearchArticle = ({
    title,
    value,
    handleChange,
}: {
    title: string
    value: string
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <Heading title={title}>
            <div className="relative w-full md:w-[32rem]">
                <input
                    type="text"
                    className="bg-black/10 dark:bg-white/10 focus:ring-1 ring-solid ring-[var(--color-primary)] py-2 px-4 rounded-md pr-2 placeholder:text-black/75 max-w-lg w-full outline-none dark:placeholder:text-white/75"
                    placeholder="Search articles..."
                    value={value}
                    onChange={handleChange}
                />
                <div className="absolute top-[3px] right-2">
                    <button className="relative w-5 h-5">
                        <Image
                            src="/svgs/search.svg"
                            fill={true}
                            alt="Search"
                            className="dark:invert"
                        />
                    </button>
                </div>
            </div>
        </Heading>
    )
}

export default SearchArticle
