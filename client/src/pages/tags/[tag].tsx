import BlogsPreviewSection from "@/components/BlogsPreviewSection"
import Pagination from "@/components/Pagination"
import SearchArticle from "@/components/SearchArticle"

const ArticlesByTag = ({ tag }: { tag: string }) => {
    return (
        <div className="py-5 space-y-4">
            {/* Search article */}
            <SearchArticle title={tag} />

            {/* Blogs */}
            <BlogsPreviewSection />

            {/* Pagination */}
            <Pagination />
        </div>
    )
}

export default ArticlesByTag

// Return tag from context in getServerSideProps
export const getServerSideProps = async ({
    query,
}: {
    query: { tag: string }
}) => {
    const tag = query.tag

    // Get articles by tag

    return {
        props: {
            tag,
        },
    }
}
