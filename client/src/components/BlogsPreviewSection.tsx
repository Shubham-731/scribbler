import BlogPreview from "./BlogPreview"

const BlogsPreviewSection = ({ editable }: { editable?: boolean }) => {
    return (
        <section className="divide-y dark:divide-white/50 divide-black/50 space-y-3">
            <BlogPreview editable={editable || false} />
            <BlogPreview editable={editable || false} />
            <BlogPreview editable={editable || false} />
        </section>
    )
}

export default BlogsPreviewSection
