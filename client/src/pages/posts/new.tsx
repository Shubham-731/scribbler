import Heading from "@/components/Heading"
import TextEditor from "@/components/TextEditor"

const NewPost = () => {
    return (
        <section className="my-3 md:my-6 space-y-10 relative w-full">
            <Heading
                title="create new post"
                desc="Create a New Post and Share Your Voice!"
            />

            {/* New post */}
            <form className="md:space-y-4 space-y-3">
                <div className="flex items-center md:gap-4 gap-3 justify-between flex-col md:flex-row">
                    <input
                        type="text"
                        placeholder="Title"
                        className="input-primary"
                    />
                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        className="input-primary"
                    />
                </div>

                <textarea
                    cols={30}
                    rows={4}
                    className="input-primary resize-none"
                    placeholder="Description"
                />

                <TextEditor />

                <button
                    className={`w-fit float-right bg-[var(--color-secondary)] py-2 px-5 font-semibold md:text-lg rounded-lg`}
                >
                    Save &rarr;
                </button>
            </form>
        </section>
    )
}

export default NewPost
