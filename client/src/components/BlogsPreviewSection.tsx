import BlogPreview from "./BlogPreview"

const BlogsPreviewSection = () => {
    return (
        <section className="divide-y dark:divide-white/50 divide-black/50 space-y-3">
            <BlogPreview />
            <BlogPreview />
            <BlogPreview />
        </section>
    )
}

export default BlogsPreviewSection
