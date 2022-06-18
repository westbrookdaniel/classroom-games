import {
    useMergeRefs,
    Stack,
    ButtonGroup,
    Button,
    useToast,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormProps } from '.'
import { useStore } from '../../store'
import { FormRadio } from '../Form'

interface FormValues {
    guess: string
}

export function PunctForm({ onClose, onCancel, token, initialRef }: FormProps) {
    if (!token.punct) throw new Error('Token of type "punct" requires punct')

    const setTokenGuess = useStore((s) => s.setTokenGuess)
    const toast = useToast({ position: 'top' })

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { isSubmitting, errors },
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = ({ guess }) => {
        const guessStr = token.answer?.slice(0, -1) + guess
        setTokenGuess(token.id, guessStr)
        const latestState = useStore.getState()
        const isCorrect = latestState.tokenMap[token.id].isCorrect
        const hasNoHealth = latestState.health === 0

        if (isCorrect) {
            toast({
                status: 'success',
                title: 'Correct!',
            })
            return onClose()
        }

        if (hasNoHealth) {
            return onClose()
        }

        reset()
        setError('guess', {
            message: 'Incorrect, try again!',
        })
    }

    return (
        <Stack
            as="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            spacing={4}
            autoComplete="off"
        >
            <FormRadio
                label="What should this be?"
                helper={`The current punctuation is "${token.punct.value}"`}
                error={errors.guess?.message}
                props={{
                    formControlProps: { isRequired: true },
                    labelProps: { fontSize: 'lg' },
                    helperProps: { fontSize: 'md' },
                    errorProps: { fontSize: 'md' },
                }}
                size="lg"
                options={[
                    { label: '.', value: '.', ref: initialRef },
                    { label: ',', value: ',' },
                    { label: ';', value: ';' },
                    { label: ':', value: ':' },
                    { label: '?', value: '?' },
                    { label: '!', value: '!' },
                ]}
                {...register('guess', {
                    required: "Don't forget to type your guess",
                })}
            />
            <ButtonGroup display="flex" justifyContent="flex-end">
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    colorScheme="green"
                >
                    Submit
                </Button>
            </ButtonGroup>
        </Stack>
    )
}
