import { Stack, Button, Heading, Text, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

export default function PageNotFound() {
    return (
        <Stack
            minH="100vh"
            minW="100vw"
            alignItems="center"
            justifyContent="center"
            p={6}
            spacing={8}
        >
            <Head>
                <title>Something Went Wrong- Paragraph Game</title>
            </Head>
            <VStack spacing={4} textAlign="center">
                <Heading>Something Went Wrong</Heading>
                <Text>There was a problem... whoops!</Text>
            </VStack>
            <Link href="/">
                <Button>Take Me Home</Button>
            </Link>
        </Stack>
    )
}
