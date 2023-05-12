import Heading from "@/components/Heading"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { useAuth } from "@/providers/AuthProvider"
import { useRouter } from "next/router"
import Head from "next/head"

const SignUp = () => {
    // Handle show password
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const toggleShowPassword = () => setShowPassword(!showPassword)

    // Register function
    const { register, user } = useAuth()
    const router = useRouter()

    // Get formdata using formik
    const initialValues: UserInputType = {
        fullName: "",
        email: "",
        password: "",
    }
    const formik = useFormik({
        initialValues,
        onSubmit: async (values, { setSubmitting }) => {
            await register(values)
            setSubmitting(false)
        },
    })

    useEffect(() => {
        if (user) {
            router.push("/")
        }
    }, [user])

    return (
        <>
            <Head>
                <title>Signup - Scribbler</title>
            </Head>

            <section>
                <Heading
                    title="Sign Up"
                    desc="Join our community of bloggers today!"
                />

                {/* Login form */}
                <form
                    className="space-y-3 my-10 max-w-md w-full mx-auto relative"
                    onSubmit={formik.handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="input-primary"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        name="fullName"
                        autoComplete="off"
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="input-primary"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        name="email"
                        autoComplete="off"
                    />
                    <div className="w-full relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="input-primary"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            name="password"
                            autoComplete="off"
                        />

                        <div className="absolute top-0.5 right-2">
                            <button
                                className="relative w-5 h-5"
                                type="button"
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? (
                                    <Image
                                        src={"/svgs/eye-slash.svg"}
                                        alt="Hide password"
                                        className="dark:invert"
                                        fill={true}
                                    />
                                ) : (
                                    <Image
                                        src={"/svgs/eye.svg"}
                                        alt="Show password"
                                        className="dark:invert"
                                        fill={true}
                                    />
                                )}
                            </button>
                        </div>
                    </div>

                    <button>
                        <Link
                            href="/auth/login"
                            className="text-sm hover:underline text-[var(--color-secondary)]"
                        >
                            Already have an account?
                        </Link>
                    </button>

                    <button
                        className={`md:w-fit w-full float-right bg-[var(--color-primary)] text-white py-2 px-5 font-semibold rounded-lg ${
                            formik.isSubmitting &&
                            !formik.isValidating &&
                            "pointer-events-none opacity-75"
                        }`}
                        type="submit"
                    >
                        Sign up &rarr;
                    </button>
                </form>
            </section>
        </>
    )
}

export default SignUp
