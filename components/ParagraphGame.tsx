import * as React from 'react'
import { VStack } from '@chakra-ui/react'
import Health from './Health'
import TokenParagraph from './TokenParagraph'
import SuccessModal from './SuccessModal'
import Message from './Message'

export default function ParagraphGame() {
    return (
        <VStack spacing={20} mt={8} maxW="3xl">
            <VStack spacing={16}>
                <Message />
                <TokenParagraph />
            </VStack>
            <Health />
            <SuccessModal />
        </VStack>
    )
}
