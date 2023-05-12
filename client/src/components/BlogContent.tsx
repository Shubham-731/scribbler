import style from "@/styles/BlogContent.module.css"
import { useEffect } from "react"
import hljs from "highlight.js"

const BlogContent = ({ content }: { content: string }) => {
    useEffect(() => {
        hljs.highlightAll()
    })

    return (
        <div
            className={style.Blog_content}
            dangerouslySetInnerHTML={{ __html: content }}
        ></div>
    )
}

export default BlogContent
