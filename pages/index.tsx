import * as React from 'react'
import { Flex, VStack, Text, Button } from '@chakra-ui/react'
import { Modal } from '../components/Modal'
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

    const [shouldOpenModal, setShouldOpenModal] = React.useState(false)
    const allCorrect = answers.every((a) => a.isCorrect)
    React.useEffect(() => {
        if (!allCorrect) return
        setTimeout(() => setShouldOpenModal(true), 1800)
    }, [allCorrect])

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
                <Modal
                    openWhen={shouldOpenModal}
                    header="Well done, you found all the errors!"
                    footer={({ onClose }) => (
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    )}
                ></Modal>
            </VStack>
        </Flex>
    )
}

export default Home
