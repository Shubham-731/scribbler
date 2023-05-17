import style from "@/styles/BlogContent.module.css"
import { useEffect, useState } from "react"
import hljs from "highlight.js"
import Image from "next/image"

const BlogContent = ({ content }: { content: string }) => {
    const [isVisible, setIsVisible] = useState(false)

    // Highlight code
    useEffect(() => {
        hljs.highlightAll()
    })

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)

        return () => {
            window.removeEventListener("scroll", toggleVisibility)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <>
            <section
                className={style.Blog_content}
                dangerouslySetInnerHTML={{ __html: content }}
            ></section>

            {isVisible && (
                <div className="fixed bottom-5 right-5 dark:bg-black bg-white border border-[var(--color-primary)] border-solid hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-primary)] transition-colors px-3 pb-1.5 pt-0 rounded-full">
                    <button className="relative w-6 h-6" onClick={scrollToTop}>
                        <Image
                            src={"/svgs/arrow-up.svg"}
                            alt="Scroll to top"
                            className="dark:invert hover:invert"
                            fill={true}
                        />
                    </button>
                </div>
            )}
        </>
    )
}

export default BlogContent
