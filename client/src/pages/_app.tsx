import "@/styles/globals.css"
import Layout from "@/components/Layout"
import type { AppProps } from "next/app"
import Providers from "@/providers"

import "highlight.js/styles/shades-of-purple.css"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Providers>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Providers>
    )
}
