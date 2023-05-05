import BlogsPreviewSection from "@/components/BlogsPreviewSection"
import Heading from "@/components/Heading"
import { useAuth } from "@/providers/AuthProvider"
import Link from "next/link"

const MyPosts = () => {
    const { user } = useAuth()
    return (
        <section className="my-3 md:my-6 space-y-10 w-full">
            {user ? (
                <Heading title="Your posts">
                    <div className="text-sm md:text-base text-center w-full">
                        You can scroll through your posts here or{" "}
                        <Link
                            href="/posts/new"
                            className="text-[var(--color-primary)] hover:underline"
                        >
                            Create a new one
                        </Link>
                        !
                    </div>
                </Heading>
            ) : (
                <Heading
                    title="Your posts"
                    desc="Login to see and create new posts!"
                />
            )}

            {/* Replace user with posts */}
            {user ? (
                <>
                    <BlogsPreviewSection editable={true} />

                    <button className="text-center w-fit block mx-auto text-[var(--color-primary)] hover:tracking-wide border border-solid border-[var(--color-primary)] rounded-md py-1 px-3 transition-all duration-200 ease-linear">
                        Show more
                    </button>
                </>
            ) : (
                <p className="text-center text-[var(--color-secondary)]">
                    You don't have any posts yet...
                </p>
            )}
        </section>
    )
}

export default MyPosts
