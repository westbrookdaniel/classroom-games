import * as React from 'react'
import { VStack, Text, Button } from '@chakra-ui/react'
import { useStore } from '../store'
import { plural } from '../utils/plural'
import Health from './Health'
import TokenParagraph from './TokenParagraph'
import { Modal } from './Modal'

export default function ParagraphGame() {
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
    )
}
