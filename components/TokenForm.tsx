import {
    Stack,
    ButtonGroup,
    Button,
    useDisclosure,
    Popover,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    useMergeRefs,
} from '@chakra-ui/react'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
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

const Form = ({ onSuccess, onCancel, tokenText, initialRef }: FormProps) => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<FormValues>()

    const { ref, ...guessProps } = register('guess', { required: true })
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
                error={errors.guess?.message || 'A guess is required'}
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
                    colorScheme="purple"
                >
                    Save
                </Button>
            </ButtonGroup>
        </Stack>
    )
}

interface PopoverProps {
    children: (disclosure: ReturnType<typeof useDisclosure>) => React.ReactNode
    tokenText: string
}

export const TokenForm = ({ children, tokenText }: PopoverProps) => {
    const disclosure = useDisclosure()
    const { onClose, isOpen } = disclosure

    const initialRef = React.useRef<HTMLInputElement | null>(null)

    return (
        <Popover
            isOpen={isOpen}
            onClose={onClose}
            placement="top"
            isLazy={true}
            initialFocusRef={initialRef}
        >
            {children(disclosure)}
            <PopoverContent zIndex={999} p={5}>
                <PopoverArrow />
                <PopoverCloseButton />
                <Form
                    initialRef={initialRef}
                    onCancel={onClose}
                    tokenText={tokenText}
                    onSuccess={onClose}
                />
            </PopoverContent>
        </Popover>
    )
}
