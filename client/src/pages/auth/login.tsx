import Heading from "@/components/Heading"
import { useAuth } from "@/providers/AuthProvider"
import { useFormik } from "formik"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

const Login = () => {
    // Handle show password
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const toggleShowPassword = () => setShowPassword(!showPassword)

    const { login, user } = useAuth()
    const router = useRouter()

    // Get formdata using formik
    const initialValues: UserInputType = {
        email: "",
        password: "",
    }
    const formik = useFormik({
        initialValues,
        onSubmit: async (values, { setSubmitting }) => {
            await login(values)
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
                <title>Login - Scribbler</title>
            </Head>

            <section>
                <Heading
                    title="Login"
                    desc="Join our community of bloggers today!"
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

                    <div className="w-full flex items-center justify-between flex-wrap gap-2">
                        <Link
                            href="/auth/signup"
                            className="text-sm hover:underline text-[var(--color-secondary)]"
                        >
                            Don't have an account?
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
                        Login &rarr;
                    </button>
                </form>
            </section>
        </>
    )
}

export default Login
