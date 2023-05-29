import "@/styles/globals.css"
import Layout from "@/components/Layout"
import type { AppProps } from "next/app"
import Providers from "@/providers"
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar"
import { useEffect, useRef } from "react"
import { useRouter } from "next/router"

import "highlight.js/styles/shades-of-purple.css"

export default function App({ Component, pageProps }: AppProps) {
    // Loading bar
    const ref = useRef<LoadingBarRef>(null)
    const router = useRouter()

    useEffect(() => {
        const handleRouteChangeStart = () => {
            ref.current?.continuousStart()
        }

        const handleRouteChangeComplete = () => {
            ref.current?.complete()
        }

        router.events.on("routeChangeStart", handleRouteChangeStart)
        router.events.on("routeChangeComplete", handleRouteChangeComplete)

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart)
            router.events.off("routeChangeComplete", handleRouteChangeComplete)
        }
    }, [router])

    return (
        <>
            <LoadingBar
                color={"#a21caf"}
                ref={ref}
                shadow={true}
                height={3}
                waitingTime={400}
            />
            <Providers>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Providers>
        </>
    )
}
