import BlogContent from "@/components/BlogContent"

const BlogBySlug = ({ slug }: { slug: string }) => {
    return (
        <section className="py-5 space-y-4">
            <div className="space-y-1 text-center pb-3 md:pb-5 border-b w-full border-b-black/50 dark:border-b-white/50">
                <p className="dark:text-white/50 text-black/50 text-sm md:text-base">
                    August 7, 2021
                </p>
                <h1 className="font-bold capitalize text-xl mb-1 md:text-2xl lg:text-3xl xl:text-4xl text-black/90 dark:text-white/90">
                    {slug.replaceAll("-", " ")}
                </h1>
            </div>

            {/* Content */}
            <BlogContent />
        </section>
    )
}

export default BlogBySlug

export const getServerSideProps = async ({
    query,
}: {
    query: { slug: string }
}) => {
    const slug = query.slug

    // Get article by slug

    return {
        props: {
            slug,
        },
    }
}
