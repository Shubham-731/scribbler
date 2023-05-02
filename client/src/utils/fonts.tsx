import { Poppins, Ubuntu } from "next/font/google"
import { NextFont } from "next/dist/compiled/@next/font"

const poppins: NextFont = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--poppins-font",
    fallback: ["sans-serif"],
    subsets: ["latin"],
})

const ubuntu: NextFont = Ubuntu({
    weight: ["300", "400", "500", "700"],
    variable: "--ubuntu-font",
    fallback: ["sans-serif"],
    subsets: ["latin", "greek"],
})

export { poppins, ubuntu }
