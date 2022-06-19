import * as React from 'react'
import { Portal, Button, HStack, Text, Stack, Box } from '@chakra-ui/react'
import { Modal } from './Modal'
import useStoreAnswers from '../utils/useStoreAnswers'
import ReactConfetti from 'react-confetti'
import { useStore } from '../store'

export default function SuccessModal() {
    const [restart, tokenMap] = useStore((s) => [s.restart, s.tokenMap])
    const { isAllCorrect } = useStoreAnswers()

    const [hasWon, setHasWon] = React.useState(false)

    React.useEffect(() => {
        if (!isAllCorrect) return
        setTimeout(() => setHasWon(true), 1000)
    }, [isAllCorrect])

    return (
        <Modal
            openWhen={hasWon}
            header="Well done, you found all the errors!"
            body={
                <Stack spacing={4}>
                    {Object.values(tokenMap)
                        .filter((t) => t.answer)
                        .map((t) => (
                            <Box key={t.id}>
                                <Text>Your guesses for {`"${t.value}"`}</Text>
                                <Text color="gray.600" key={t.id}>
                                    {t.guess.slice(0, -1).join(', ')}
                                    {t.guess.length > 1 ? ', ' : null}
                                    {
                                        <Text as="span" color="green.600">
                                            {t.guess[t.guess.length - 1]}
                                        </Text>
                                    }
                                </Text>
                            </Box>
                        ))}
                    {Object.values(tokenMap).filter(
                        (t) => !t.answer && t.hasSelected
                    ).length > 0 ? (
                        <Box>
                            <Text>You also guessed</Text>
                            <Text color="gray.600">
                                {Object.values(tokenMap)
                                    .filter((t) => !t.answer && t.hasSelected)
                                    .map((t) => t.value)
                                    .join(', ')}
                            </Text>
                        </Box>
                    ) : null}
                </Stack>
            }
            footer={({ onClose, isOpen }) => (
                <>
                    {isOpen ? (
                        <Portal>
                            <ReactConfetti />
                        </Portal>
                    ) : null}
                    <HStack>
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            colorScheme="green"
                            onClick={() => {
                                restart()
                                onClose()
                                setHasWon(false)
                            }}
                        >
                            Restart
                        </Button>
                    </HStack>
                </>
            )}
        >
            {({ onOpen }) =>
                hasWon ? <Button onClick={onOpen}>Show Results</Button> : null
            }
        </Modal>
    )
}
