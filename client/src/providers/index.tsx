import ThemeProvider from "./ThemeProvider"
import AuthProvider from "./AuthProvider"

function Providers({ children }: { children: JSX.Element }) {
    return (
        <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
    )
}

export default Providers
