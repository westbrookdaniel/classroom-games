import * as React from 'react'
import { VStack, Text, Portal, Button } from '@chakra-ui/react'
import { plural } from '../utils/plural'
import Health from './Health'
import TokenParagraph from './TokenParagraph'
import { Modal } from './Modal'
import useStoreAnswers from '../utils/useStoreAnswers'
import ReactConfetti from 'react-confetti'

export default function ParagraphGame() {
    const { answers, isAllCorrect } = useStoreAnswers()

    const [hasWon, setHasWon] = React.useState(false)

    React.useEffect(() => {
        if (!isAllCorrect) return
        setTimeout(() => setHasWon(true), 1800)
    }, [isAllCorrect])

    return (
        <VStack spacing={20} mt={8} maxW="3xl">
            <VStack spacing={16}>
                <VStack color="gray.500" align="center">
                    <Text fontSize="lg">
                        There{' '}
                        {plural(
                            answers.length,
                            `is ${answers.length} error`,
                            `are ${answers.length} errors`
                        )}{' '}
                        in this paragraph, can you find{' '}
                        {plural(answers.length, 'it', 'them all')}?
                    </Text>
                    <Text>Click on an error to correct it</Text>
                </VStack>
                <TokenParagraph />
            </VStack>
            <Health />
            <Modal
                openWhen={hasWon}
                header="Well done, you found all the errors!"
                footer={({ onClose, isOpen }) => (
                    <>
                        {isOpen ? (
                            <Portal>
                                <ReactConfetti />
                            </Portal>
                        ) : null}
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    </>
                )}
            ></Modal>
        </VStack>
    )
}
