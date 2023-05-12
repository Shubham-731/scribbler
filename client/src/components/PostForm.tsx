import TextEditor from "@/components/TextEditor"
import { tagsToString } from "@/utils/format"
import { useFormik } from "formik"

interface ComponentProp {
    formHandler: (values: PostRequestBody) => Promise<void>
    btnText: string
    values?: PostDocumentType
}

const PostForm = ({ formHandler, btnText, values }: ComponentProp) => {
    // Handle form
    const initialValues: PostRequestBody = {
        title: values?.title || "",
        description: values?.description || "",
        tags:
            tagsToString(
                (typeof values?.tags === "object" && values?.tags) || [""]
            ) || "",
        content: values?.content || "",
    }
    const formik = useFormik({
        initialValues,
        onSubmit: async (values, actions) => {
            await formHandler(values)
            actions.setSubmitting(false)
        },
    })

    return (
        <form className="md:space-y-4 space-y-3" onSubmit={formik.handleSubmit}>
            <div className="flex items-center md:gap-4 gap-3 justify-between flex-col md:flex-row">
                <input
                    type="text"
                    placeholder="Title"
                    className="input-primary"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    autoComplete="off"
                />
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    className="input-primary"
                    name="tags"
                    value={formik.values.tags}
                    onChange={formik.handleChange}
                    autoComplete="off"
                />
            </div>

            <textarea
                cols={30}
                rows={3}
                className="input-primary resize-none"
                placeholder="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                autoComplete="off"
            />
            <TextEditor
                editorHandler={(value) =>
                    formik.setFieldValue("content", value)
                }
                initialValue={formik.values.content}
            />

            <button
                className={`w-fit float-right bg-[var(--color-secondary)] py-2 px-5 font-semibold md:text-lg rounded-lg ${
                    formik.isSubmitting && "pointer-events-none opacity-50"
                }`}
                type="submit"
            >
                {btnText} &rarr;
            </button>
        </form>
    )
}

export default PostForm
