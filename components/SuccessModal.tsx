import * as React from 'react'
import { Portal, Button } from '@chakra-ui/react'
import { Modal } from './Modal'
import useStoreAnswers from '../utils/useStoreAnswers'
import ReactConfetti from 'react-confetti'

export default function SuccessModal() {
    const { isAllCorrect } = useStoreAnswers()

    const [hasWon, setHasWon] = React.useState(false)

    React.useEffect(() => {
        if (!isAllCorrect) return
        setTimeout(() => setHasWon(true), 1800)
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
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                </>
            )}
        />
    )
}
