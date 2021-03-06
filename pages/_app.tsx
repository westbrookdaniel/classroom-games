import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Head>
                <title>Page Not Found - Paragraph Game</title>
            </Head>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp
