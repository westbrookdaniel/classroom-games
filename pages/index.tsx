import * as React from 'react'
import { Flex, VStack, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import TokenParagraph from '../components/TokenParagraph'
import { useStore } from '../store'
import Health from '../components/Health'
import { plural } from '../utils/plural'

useStore
    .getState()
    .setParagraph('This is a very nomal looking paragraph, or so I believe.', {
        [8]: 'normal',
    })

const Home: NextPage = () => {
    const answers = useStore((s) =>
        Object.values(s.tokenMap).filter((s) => s.answer)
    )
    return (
        <Flex
            minH="100vh"
            minW="100vw"
            alignItems="center"
            justifyContent="center"
            p={6}
        >
            <Head>
                <title>Classroom Games</title>
                <meta
                    name="description"
                    content="Some fun games for the classroom"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <VStack spacing={16}>
                <VStack spacing={12}>
                    <Text color="gray.500" align="center">
                        There{' '}
                        {plural(
                            answers.length,
                            `is ${answers.length} error`,
                            `are ${answers.length} errors`
                        )}{' '}
                        in this paragraph, can you find{' '}
                        {plural(answers.length, 'it', 'them all')}?
                    </Text>
                    <TokenParagraph />
                </VStack>
                <Health />
            </VStack>
        </Flex>
    )
}

export default Home
