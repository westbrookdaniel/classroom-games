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
import { FormInput } from '../Form'

interface FormValues {
    guess: string
}

export function TextForm({ onClose, onCancel, token, initialRef }: FormProps) {
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
            message: 'Incorrect, try again!',
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
                props={{
                    formControlProps: { isRequired: true },
                    labelProps: { fontSize: 'lg' },
                    helperProps: { fontSize: 'md' },
                    errorProps: { fontSize: 'md' },
                }}
                size="lg"
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
                    Submit
                </Button>
            </ButtonGroup>
        </Stack>
    )
}
