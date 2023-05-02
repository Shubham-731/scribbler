import Heading from "@/components/Heading"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const Login = () => {
    // Handle show password
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const toggleShowPassword = () => setShowPassword(!showPassword)
    console.log(showPassword)

    return (
        <section>
            <Heading
                title="Login"
                desc="Join our community of bloggers today!"
            />

            {/* Login form */}
            <form className="space-y-3 my-10 max-w-md w-full mx-auto relative">
                <input
                    type="text"
                    placeholder="Email Address"
                    className="input-primary"
                />
                <div className="w-full relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="input-primary"
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
                        href="#"
                        className="text-sm hover:underline text-[var(--color-secondary)]"
                    >
                        Forgot Password?
                    </Link>
                    <Link
                        href="/auth/signup"
                        className="text-sm hover:underline text-[var(--color-secondary)]"
                    >
                        New blogger?
                    </Link>
                </div>

                <button
                    className={`md:w-fit w-full float-right bg-[var(--color-primary)] text-white py-2 px-5 font-semibold md:text-lg rounded-lg`}
                    type="submit"
                >
                    Login &rarr;
                </button>
            </form>
        </section>
    )
}

export default Login
