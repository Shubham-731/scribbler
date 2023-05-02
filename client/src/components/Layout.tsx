import Header from "./Header"
import Footer from "./Footer"
import { poppins } from "@/utils/fonts"

const Layout = ({ children }: { children: JSX.Element }) => {
    return (
        <div className="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-black/80 dark:text-white/80">
            <div className="max-w-5xl w-full relative mx-auto flex flex-col gap-4 p-5 min-h-screen">
                <Header />
                <main className={`${poppins.className} flex-1`}>
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default Layout
