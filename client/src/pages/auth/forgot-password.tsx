import Heading from "@/components/Heading"
import { useAuth } from "@/providers/AuthProvider"
import { useFormik } from "formik"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"

const ForgotPassword = () => {
    const { forgotPassword, user } = useAuth()
    const router = useRouter()

    // Get formdata using formik
    const formik = useFormik<{ email: string }>({
        initialValues: { email: "" },
        onSubmit: async (values, { setSubmitting }) => {
            await forgotPassword(values.email)
            setSubmitting(false)
        },
    })

    // Protect from authenticated users
    useEffect(() => {
        if (user) {
            router.push("/")
        }
    }, [user])

    return (
        <section>
            <Heading
                title="Forgot Password"
                desc="Enter your email and quickly reset your password!"
            />

            {/* Login form */}
            <form
                className="space-y-3 my-10 max-w-md w-full mx-auto relative"
                onSubmit={formik.handleSubmit}
            >
                <input
                    type="email"
                    placeholder="Email Address"
                    className="input-primary"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                    autoComplete="off"
                />

                <div className="w-full flex items-center justify-between flex-wrap gap-2">
                    <Link
                        href="/auth/login"
                        className="text-sm hover:underline text-[var(--color-secondary)]"
                    >
                        Login
                    </Link>
                    <Link
                        href="/auth/signup"
                        className="text-sm hover:underline text-[var(--color-secondary)]"
                    >
                        Register
                    </Link>
                </div>

                <button
                    className={`md:w-fit w-full float-right bg-[var(--color-primary)] text-white py-2 px-5 font-semibold rounded-lg ${
                        formik.isSubmitting &&
                        !formik.isValidating &&
                        "pointer-events-none opacity-75"
                    }`}
                    type="submit"
                >
                    Reset password &rarr;
                </button>
            </form>
        </section>
    )
}

export default ForgotPassword
