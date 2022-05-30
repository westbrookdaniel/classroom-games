import * as React from 'react'
import { Text, Stack } from '@chakra-ui/react'
import { createTokensFromParagraph } from '../utils/createTokensFromParagraph'
import { TokenDisplay } from './TokenDisplay'
import { Control, useWatch } from 'react-hook-form'
import { FormValues } from '../pages/create'

interface Props {
    control: Control<FormValues, any>
}

interface PreviewType {
    correct: JSX.Element[]
    incorrect: JSX.Element[]
}

export function ParagraphPreview({ control }: Props) {
    const [, startTransition] = React.useTransition()

    const paragraph = useWatch({
        control,
        name: 'paragraph',
    })

    const [preview, setPreview] = React.useState<PreviewType>({
        correct: [],
        incorrect: [],
    })

    React.useEffect(() => {
        startTransition(() => {
            const newPreview: PreviewType = { correct: [], incorrect: [] }
            Object.values(createTokensFromParagraph(paragraph || '')).forEach(
                (t) => {
                    newPreview.incorrect.push(
                        <TokenDisplay key={t.id} token={t} />
                    )
                    newPreview.correct.push(
                        <TokenDisplay
                            key={t.id}
                            token={t.answer ? { ...t, isCorrect: true } : t}
                        />
                    )
                }
            )
            setPreview(newPreview)
        })
    }, [paragraph])

    return (
        <Stack spacing={4}>
            <Text fontWeight="semibold">Preview</Text>
            <Stack spacing={1}>
                <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                    Incorrect
                </Text>
                {preview.incorrect.length === 0 ? (
                    <Text color="gray.500">
                        Enter your paragraph to view a preview
                    </Text>
                ) : (
                    <Text>{preview.incorrect}</Text>
                )}
            </Stack>

            <Stack spacing={1}>
                <Text color="gray.500" fontSize="sm" fontWeight="semibold">
                    Corrected
                </Text>
                {preview.correct.length === 0 ? (
                    <Text color="gray.500">
                        Enter your paragraph to view a preview
                    </Text>
                ) : (
                    <Text>{preview.correct}</Text>
                )}
            </Stack>
        </Stack>
    )
}
