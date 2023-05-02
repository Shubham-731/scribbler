import { useContext, createContext, useState, useEffect, Context } from "react"

// Types
interface ThemeContextType {
    theme: string
    toggleTheme: () => void
}

// Create theme context
const ThemeContext: Context<ThemeContextType> = createContext({
    theme: "light",
    toggleTheme: () => {},
})

// Theme Provider
function ThemeProvider({ children }: { children: JSX.Element }) {
    const [theme, setTheme] = useState<"light" | "dark">("light")

    // Toggle theme
    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }

    useEffect(() => {
        // Set preffered theme
        const prefferedTheme: "light" | "dark" = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
            ? "dark"
            : "light"

        setTheme(prefferedTheme)
    }, [])

    useEffect(() => {
        // Set theme class in HTML element
        document.documentElement.className = theme
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
export const useTheme = () => useContext(ThemeContext)
