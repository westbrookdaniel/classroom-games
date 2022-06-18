import * as React from 'react'
import { Portal, Button, HStack } from '@chakra-ui/react'
import { Modal } from './Modal'
import useStoreAnswers from '../utils/useStoreAnswers'
import ReactConfetti from 'react-confetti'
import { useStore } from '../store'

export default function SuccessModal() {
    const restart = useStore((s) => s.restart)
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
