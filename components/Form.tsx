import * as React from 'react'
import {
    Checkbox,
    CheckboxProps,
    HTMLChakraProps,
    Input,
    InputProps,
    Radio,
    Text,
    RadioProps,
    Stack,
    Textarea,
    TextareaProps,
    FormLabel as ChakraFormLabel,
    FormErrorMessage as ChakraFormErrorMessage,
    FormControl,
    FormControlProps,
} from '@chakra-ui/react'

type Stylable = HTMLChakraProps<'div'>

interface FormLabelProps extends Stylable, Pick<InputProps, 'name'> {
    label?: string
}

export const FormLabel: React.FC<FormLabelProps> = ({ label, name }) => {
    return label ? (
        <ChakraFormLabel m={0} htmlFor={name}>
            {label}
        </ChakraFormLabel>
    ) : null
}

interface FormHelperProps extends Stylable {
    helper?: string
}

export const FormHelper: React.FC<FormHelperProps> = ({ helper }) => {
    return helper ? (
        <Text fontSize="sm" color="gray.500">
            {helper}
        </Text>
    ) : null
}

interface FormErrorProps extends Stylable {
    error?: string | boolean
}

export const FormError: React.FC<FormErrorProps> = ({ error }) => {
    return <ChakraFormErrorMessage>{error}</ChakraFormErrorMessage>
}

interface FormElementsProps
    extends FormLabelProps,
        FormHelperProps,
        FormErrorProps {
    formControlProps?: FormControlProps
}

export const FormElements: React.FC<FormElementsProps> = ({
    children,
    helper,
    error,
    label,
    name,
    formControlProps,
}) => {
    return (
        <FormControl isInvalid={!!error} {...formControlProps}>
            {label || helper ? (
                <Stack spacing={1} mb={2}>
                    <FormLabel label={label} name={name} />
                    <FormHelper helper={helper} />
                </Stack>
            ) : null}
            {children}
            <FormError error={error} />
        </FormControl>
    )
}

export const FormTextArea = React.forwardRef<
    HTMLTextAreaElement,
    FormElementsProps & TextareaProps
>(({ label, helper, error, formControlProps, name, ...props }, ref) => {
    return (
        <FormElements
            formControlProps={formControlProps}
            helper={helper}
            error={error}
            label={label}
            name={name}
        >
            <Textarea id={name} name={name} w="full" ref={ref} {...props} />
        </FormElements>
    )
})

export const FormInput = React.forwardRef<
    HTMLInputElement,
    FormElementsProps & InputProps
>(function FormInput(
    { label, helper, error, formControlProps, name, ...props },
    ref
) {
    return (
        <FormElements
            formControlProps={formControlProps}
            helper={helper}
            error={error}
            label={label}
            name={name}
        >
            <Input id={name} name={name} w="full" ref={ref} {...props} />
        </FormElements>
    )
})

export const FormCheckbox: React.FC<FormElementsProps & CheckboxProps> = ({
    label,
    helper,
    error,
    name,
    formControlProps,
    ...props
}) => {
    return (
        <Stack as={FormControl} isInvalid={!!error} {...formControlProps}>
            <Stack alignItems="center">
                <Checkbox
                    id={name}
                    name={name}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={`${name}-error`}
                    {...props}
                />
                {label || helper ? (
                    <FormLabel userSelect="none" label={label} name={name} />
                ) : null}
            </Stack>
            <FormError error={error} />
        </Stack>
    )
}

export const FormRadio: React.FC<FormElementsProps & RadioProps> = ({
    label,
    helper,
    error,
    name,
    formControlProps,
    value,
    ...props
}) => {
    return (
        <Stack as={FormControl} isInvalid={!!error} {...formControlProps}>
            <Stack alignItems="center">
                <Radio
                    id={`${value}`}
                    name={name}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={`${name}-error`}
                    value={value}
                    {...props}
                />
                {label || helper ? (
                    <FormLabel
                        userSelect="none"
                        label={label}
                        name={`${value}`}
                    />
                ) : null}
            </Stack>
            <FormError error={error} />
        </Stack>
    )
}
