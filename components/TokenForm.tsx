import { useMergeRefs, Stack, ButtonGroup, Button } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TokenState, useStore } from '../store'
import { FormInput } from './Form'

interface FormProps {
    onCancel: () => void
    onSuccess: () => void
    token: TokenState
    initialRef: React.RefObject<HTMLInputElement>
}

interface FormValues {
    guess: string
}

export function TokenForm({
    onSuccess,
    onCancel,
    token,
    initialRef,
}: FormProps) {
    const setTokenGuess = useStore((s) => s.setTokenGuess)

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = ({ guess }) => {
        setTokenGuess(token.id, guess)
        onSuccess()
    }

    const { ref, ...guessProps } = register('guess', {
        required: 'Guess is required',
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
