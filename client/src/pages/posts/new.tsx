import Heading from "@/components/Heading"
import TextEditor from "@/components/TextEditor"
import { useFormik } from "formik"

const NewPost = () => {
    // Formik initial values
    const initialValues = {
        title: "",
        desc: "",
        tags: "",
        content: "",
    }
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log(values)
        },
    })

    return (
        <section className="my-3 md:my-6 space-y-10 relative w-full">
            <Heading
                title="create new post"
                desc="Create a New Post and Share Your Voice!"
            />

            {/* New post */}
            <form
                className="md:space-y-4 space-y-3"
                onSubmit={formik.handleSubmit}
            >
                <div className="flex items-center md:gap-4 gap-3 justify-between flex-col md:flex-row">
                    <input
                        type="text"
                        placeholder="Title"
                        className="input-primary"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        className="input-primary"
                        name="tags"
                        value={formik.values.tags}
                        onChange={formik.handleChange}
                    />
                </div>

                <textarea
                    cols={30}
                    rows={3}
                    className="input-primary resize-none"
                    placeholder="Description"
                    name="desc"
                    value={formik.values.desc}
                    onChange={formik.handleChange}
                />

                <TextEditor
                    editorHandler={(value) =>
                        formik.setFieldValue("content", value)
                    }
                />

                <button
                    className={`w-fit float-right bg-[var(--color-secondary)] py-2 px-5 font-semibold md:text-lg rounded-lg`}
                    type="submit"
                >
                    Save &rarr;
                </button>
            </form>
        </section>
    )
}

export default NewPost
