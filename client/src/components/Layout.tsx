import Header from "./Header"
import Footer from "./Footer"
import { poppins } from "@/utils/fonts"
import { Toaster } from "react-hot-toast"
import SEO from "./SEO"

const Layout = ({ children }: { children: JSX.Element }) => {
    return (
        <>
            <SEO
                title="Scribbler"
                description="Welcome to Scribbler! With our platform, you can easily create and manage your own blog. Our application features a clean and user-friendly interface, allowing you to focus on what's important - your writing. We've also included a variety of customization options, allowing you to personalize your blog and make it truly unique. Our application is built using the MERN stack, a powerful combination of technologies including MongoDB, Express.js, React, and Node.js. This means that our platform is both fast and scalable, ensuring a smooth and enjoyable experience for both you and your readers. Whether you're an experienced blogger or just starting out, our MERN stack blogging application is the perfect platform for you!"
                url={process.env.NEXT_PUBLIC_CLIENT_URL || ""}
                tags="Blogging,Writing,Content creation,Online publishing,Social media,SEO,Marketing,Digital media,Entrepreneurship,Business,Technology,Web development,Design,Personal development,Productivity,Leadership,Education,Health,Travel,Food."
            />
            <div className="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-black/80 dark:text-white/80">
                <div className="max-w-5xl w-full relative mx-auto flex flex-col gap-4 p-5 min-h-screen overflow-x-hidden">
                    <Header />
                    <main className={`${poppins.className} flex-1`}>
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
            <Toaster position="bottom-right" />
        </>
    )
}

export default Layout
