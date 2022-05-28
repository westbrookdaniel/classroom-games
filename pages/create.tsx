import * as React from 'react'
import Link from 'next/link'
import { Button, Heading, Stack, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'

const Create: NextPage = () => {
    return (
        <Stack
            minH="100vh"
            minW="100vw"
            alignItems="center"
            justifyContent="center"
            p={6}
        >
            <Head>
                <title>Create - Paragraph Game</title>
                <meta
                    name="description"
                    content="A fun game for the classroom"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <VStack spacing={8}>
                <Heading>Create</Heading>
                <Link href="/">
                    <Button>Back</Button>
                </Link>
            </VStack>
        </Stack>
    )
}

export default Create
