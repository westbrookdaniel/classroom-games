import { useMergeRefs, Stack, ButtonGroup, Button } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormInput } from './Form'

interface FormProps {
    onCancel: () => void
    onSuccess: () => void
    tokenText: string
    initialRef: React.RefObject<HTMLInputElement>
}

interface FormValues {
    guess: string
}

export function TokenForm({
    onSuccess,
    onCancel,
    tokenText,
    initialRef,
}: FormProps) {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<FormValues>()

    const { ref, ...guessProps } = register('guess', {
        required: 'Guess is required',
    })
    const refs = useMergeRefs(ref, initialRef)

    const onSubmit: SubmitHandler<FormValues> = () => {
        onSuccess()
    }

    return (
        <Stack
            as="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            spacing={4}
        >
            <FormInput
                label="What should this say?"
                helper={`It currently says: "${tokenText}"`}
                error={errors.guess?.message}
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
