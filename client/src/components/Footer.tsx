import { ubuntu } from "@/utils/fonts"
import Image from "next/image"

const Footer = () => {
    const sci: { link: string; alt: string; src: string }[] = [
        {
            link: "https://www.linkedin.com/in/suraj-pandey-464516241/",
            alt: "Linkedin",
            src: "/svgs/linkedin.svg",
        },
        {
            link: "https://github.com/Shubham-731",
            alt: "Github",
            src: "/svgs/github.svg",
        },
        {
            link: "shpcore103@gmail.com",
            alt: "Mail",
            src: "/svgs/mail.svg",
        },
    ]

    return (
        <footer className={`${ubuntu.className} w-full relative p-5`}>
            {/* Social icons */}
            <ul className="flex items-center gap-4 justify-center">
                {sci.map((item, index) => {
                    return (
                        <li key={index} className="relative w-6 h-6">
                            <a
                                href={
                                    item.alt === "Mail"
                                        ? `mailto:${item.link}`
                                        : item.link
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute w-full h-full"
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill={true}
                                    className="dark:invert"
                                />
                            </a>
                        </li>
                    )
                })}
            </ul>

            <p className="dark:text-white/80 text-black/80 text-center mt-3 text-sm md:text-base">
                &copy; Copyright 2023 - All rights reserved
            </p>
        </footer>
    )
}

export default Footer
