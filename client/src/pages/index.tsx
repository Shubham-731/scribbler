import BlogsPreviewSection from "@/components/BlogsPreviewSection"
import Heading from "@/components/Heading"
import Link from "next/link"

export default function Home() {
    return (
        <div className="py-5 space-y-4">
            <Heading
                title="latest blogs"
                desc="Here're some latest blog posts you can browse for free!"
            />

            {/* Blogs */}
            <BlogsPreviewSection />

            {/* All blogs */}
            <Link
                href={"/blogs"}
                className="text-right w-fit block ml-auto text-[var(--color-primary)] hover:tracking-wide border border-solid border-[var(--color-primary)] rounded-md py-1 px-3 transition-all duration-200 ease-linear"
            >
                All blogs &rarr;
            </Link>
        </div>
    )
}
