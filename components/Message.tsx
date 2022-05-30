import * as React from 'react'
import { VStack, Text } from '@chakra-ui/react'
import { plural } from '../utils/plural'
import useStoreAnswers from '../utils/useStoreAnswers'

export default function ParagraphGame() {
    const { answers } = useStoreAnswers()

    return (
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
    )
}
