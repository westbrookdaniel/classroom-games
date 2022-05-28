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
                <title>Page Not Found - Paragraph Game</title>
            </Head>
            <VStack spacing={4} textAlign="center">
                <Heading>Page Not Found</Heading>
                <Text>The page you were looking for could not be found</Text>
            </VStack>
            <Link href="/">
                <Button>Take Me Home</Button>
            </Link>
        </Stack>
    )
}
