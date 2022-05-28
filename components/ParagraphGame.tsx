import * as React from 'react'
import { VStack, Text, Button } from '@chakra-ui/react'
import { plural } from '../utils/plural'
import Health from './Health'
import TokenParagraph from './TokenParagraph'
import { Modal } from './Modal'
import useStoreAnswers from '../utils/useStoreAnswers'

export default function ParagraphGame() {
    const { answers, isAllCorrect } = useStoreAnswers()

    const [shouldOpenModal, setShouldOpenModal] = React.useState(false)

    React.useEffect(() => {
        if (!isAllCorrect) return
        setTimeout(() => setShouldOpenModal(true), 1800)
    }, [isAllCorrect])

    return (
        <VStack spacing={16} maxW="2xl">
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
    )
}
