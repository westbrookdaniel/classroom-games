import * as React from 'react'
import { Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import TokenParagraph from '../components/TokenParagraph'
import { useStore } from '../store'

useStore
    .getState()
    .setParagraph('This is a very nomal looking paragraph, or so I believe.')

const Home: NextPage = () => {
    return (
        <Flex
            minH="100vh"
            minW="100vw"
            alignItems="center"
            justifyContent="center"
        >
            <Head>
                <title>Classroom Games</title>
                <meta
                    name="description"
                    content="Some fun games for the classroom"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TokenParagraph />
        </Flex>
    )
}

export default Home
