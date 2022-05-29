import { Text, Stack } from '@chakra-ui/react'
import { createTokensFromParagraph } from '../utils/createTokensFromParagraph'
import { TokenDisplay } from './TokenDisplay'

interface Props {
    paragraph: string
}

export function ParagraphPreview({ paragraph }: Props) {
    const incorrectPreview = Object.values(
        createTokensFromParagraph(paragraph || '')
    ).map((t) => <TokenDisplay key={t.id} token={t} />)

    const correctPreview = Object.values(
        createTokensFromParagraph(paragraph || '')
    ).map((t) => {
        if (t.answer) t.isCorrect = true
        return <TokenDisplay key={t.id} token={t} />
    })

    return (
        <Stack spacing={4}>
            <Text fontWeight="semibold">Preview</Text>
            <Stack spacing={1}>
                <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                    Incorrect
                </Text>
                {incorrectPreview.length === 0 ? (
                    <Text color="gray.500">
                        Enter your paragraph to view a preview
                    </Text>
                ) : (
                    <Text>{incorrectPreview}</Text>
                )}
            </Stack>

            <Stack spacing={1}>
                <Text color="gray.500" fontSize="sm" fontWeight="semibold">
                    Corrected
                </Text>
                {correctPreview.length === 0 ? (
                    <Text color="gray.500">
                        Enter your paragraph to view a preview
                    </Text>
                ) : (
                    <Text>{correctPreview}</Text>
                )}
            </Stack>
        </Stack>
    )
}
