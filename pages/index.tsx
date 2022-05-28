import * as React from 'react'
import Link from 'next/link'
import { Button, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import ParagraphGame from '../components/ParagraphGame'
import { useStore } from '../store'

// Setup the static home page data
useStore
    .getState()
    .setParagraph(
        'This is a very nomal{normal} looking paragraph, or so I believe.'
    )

const Home: NextPage = () => {
    return (
        <Stack
            minH="100vh"
            minW="100vw"
            alignItems="center"
            justifyContent="center"
            p={6}
            spacing={16}
        >
            <Head>
                <title>Paragraph Game</title>
                <meta
                    name="description"
                    content="Some fun games for the classroom"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Stack flexGrow={1} justifyContent="center">
                <ParagraphGame />
            </Stack>
            <Link href="/create">
                <Button variant="ghost" size="sm">
                    Create Your Own
                </Button>
            </Link>
        </Stack>
    )
}

export default Home
