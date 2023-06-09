import { ubuntu } from "@/utils/fonts"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useTheme } from "@/providers/ThemeProvider"
import { useAuth } from "@/providers/AuthProvider"

const Menu = ({
    closeSidebarHandler,
}: {
    closeSidebarHandler?: () => void
}) => {
    const router = useRouter()
    const { user, logout } = useAuth()

    const tabs: { title: string; href: string; visible: boolean }[] = [
        {
            title: "Home",
            href: "/",
            visible: true,
        },
        {
            title: "Blogs",
            href: "/blogs",
            visible: true,
        },
        {
            title: "Tags",
            href: "/tags",
            visible: true,
        },
        {
            title: "my posts",
            href: "/posts",
            visible: Boolean(user),
        },
    ]

    return (
        <ul className="flex items-center flex-col md:flex-row gap-6 md:gap-4">
            {tabs.map(
                (tab) =>
                    tab.visible && (
                        <li
                            key={tab.title}
                            className={`text-2xl capitalize md:text-lg font-medium transition-all text-black/80 dark:text-white/80 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary)] ${
                                router.pathname === tab.href &&
                                "text-[var(--color-primary)] dark:text-[var(--color-primary)]"
                            }`}
                            onClick={closeSidebarHandler}
                        >
                            <Link href={tab.href}>{tab.title}</Link>
                        </li>
                    )
            )}

            <li
                className={`text-2xl capitalize md:text-lg font-medium transition-all hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary)] text-[var(--color-primary)] dark:text-[var(--color-primary)]`}
                onClick={closeSidebarHandler}
            >
                {user ? (
                    <button
                        className={`capitalize border border-solid border-[var(--color-primary)] rounded-md py-2 md:py-1 px-4 hover:bg-[var(--color-primary)] dark:hover:text-white/80 hover:text-white/80`}
                        onClick={logout}
                    >
                        logout
                    </button>
                ) : (
                    <Link href={"/auth/login"}>
                        <button
                            className={`capitalize border border-solid border-[var(--color-primary)] rounded-md py-2 md:py-1 px-4 hover:bg-[var(--color-primary)] dark:hover:text-white/80 hover:text-white/80`}
                        >
                            login
                        </button>
                    </Link>
                )}
            </li>
        </ul>
    )
}

const Sidebar = ({
    openSidebar,
    closeSidebarHandler,
}: {
    openSidebar: boolean
    closeSidebarHandler: () => void
}) => {
    return (
        <div
            className={`absolute -inset-5 ${
                !openSidebar && "left-[calc(100%+1.25rem)]"
            } z-10 backdrop-blur-[2px] md:hidden bg-white/80 dark:bg-black/80 transition-all ease-in-out duration-200 backdrop-invert w-screen h-screen flex items-center justify-center`}
        >
            <div className="absolute top-5 right-5">
                <button
                    className="relative w-6 h-6"
                    onClick={closeSidebarHandler}
                >
                    <Image
                        src={"/svgs/x-mark.svg"}
                        alt="Close sidebar"
                        className="dark:invert"
                        fill={true}
                    />
                </button>
            </div>

            <Menu closeSidebarHandler={closeSidebarHandler} />
        </div>
    )
}

const Header = () => {
    const [openSidebar, setOpenSidebar] = useState<boolean>(false)
    const sidebarHandler = () => setOpenSidebar((prev) => !prev)

    const { theme, toggleTheme } = useTheme()

    return (
        <header
            className={`${ubuntu.className} w-full relative inset-0 flex items-center justify-between`}
        >
            <Link className="relative w-24 h-10" href="/">
                <Image
                    src={"/next.svg"}
                    alt="Vercel logo"
                    className="dark:invert"
                    fill={true}
                />
            </Link>

            <div className="flex gap-3 items-center">
                {/* For widescreens */}
                <div className="hidden md:block mr-4">
                    <Menu closeSidebarHandler={sidebarHandler} />
                </div>

                <button className="relative w-6 h-6" onClick={toggleTheme}>
                    {theme === "light" ? (
                        <Image
                            src={"/svgs/moon.svg"}
                            alt="Dark mode"
                            fill={true}
                        />
                    ) : (
                        <Image
                            src={"/svgs/sun.svg"}
                            alt="Dark mode"
                            className="dark:invert"
                            fill={true}
                        />
                    )}
                </button>

                {/* For mobile devices */}
                <button
                    className="relative w-6 h-6 md:hidden"
                    onClick={sidebarHandler}
                >
                    <Image
                        src={"/svgs/bars-right.svg"}
                        alt="Menu bar"
                        className="dark:invert"
                        fill={true}
                    />
                </button>
            </div>

            <Sidebar
                openSidebar={openSidebar}
                closeSidebarHandler={sidebarHandler}
            />
        </header>
    )
}

export default Header
