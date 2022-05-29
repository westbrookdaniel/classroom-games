import {
    useMergeRefs,
    Stack,
    ButtonGroup,
    Button,
    useToast,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TokenState, useStore } from '../store'
import { FormInput } from './Form'

interface FormProps {
    onCancel: () => void
    onClose: () => void
    token: TokenState
    initialRef: React.RefObject<HTMLInputElement>
}

interface FormValues {
    guess: string
}

export function TokenForm({ onClose, onCancel, token, initialRef }: FormProps) {
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
        setTokenGuess(token.id, guess)
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
            message: "You didn't get it right, try again!",
        })
    }

    const { ref, ...guessProps } = register('guess', {
        required: "Don't forget to type your guess",
    })

    const refs = useMergeRefs(ref, initialRef)

    return (
        <Stack
            as="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            spacing={4}
            autoComplete="off"
        >
            <FormInput
                label="What should this say?"
                helper={`It currently says: "${token.value}"`}
                error={errors.guess?.message}
                autoComplete="off"
                formControlProps={{ isRequired: true }}
                ref={refs}
                {...guessProps}
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
                    Save
                </Button>
            </ButtonGroup>
        </Stack>
    )
}
