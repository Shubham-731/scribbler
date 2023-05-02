import ThemeProvider from "./ThemeProvider"

function Providers({ children }: { children: JSX.Element }) {
    return <ThemeProvider>{children}</ThemeProvider>
}

export default Providers
