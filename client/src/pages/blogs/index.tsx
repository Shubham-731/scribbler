import BlogsPreviewSection from "@/components/BlogsPreviewSection"
import Pagination from "@/components/Pagination"
import SearchArticle from "@/components/SearchArticle"

const Blogs = () => {
    return (
        <div className="py-5 space-y-4">
            {/* Search article */}
            <SearchArticle title="all posts" />

            {/* Blogs */}
            <BlogsPreviewSection />

            {/* Pagination */}
            <Pagination />
        </div>
    )
}

export default Blogs
