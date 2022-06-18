import * as React from 'react'
import {
    Checkbox,
    CheckboxProps,
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
    HStack,
    StyleProps,
    ChakraProps,
    RadioGroup,
    StackProps,
    Box,
    Flex,
} from '@chakra-ui/react'

type Stylable = StyleProps & ChakraProps

interface FormLabelProps extends Stylable, Pick<InputProps, 'name'> {
    label?: string
}

export const FormLabel: React.FC<FormLabelProps> = ({
    label,
    name,
    ...props
}) => {
    return label ? (
        <ChakraFormLabel m={0} htmlFor={name} {...props}>
            {label}
        </ChakraFormLabel>
    ) : null
}

interface FormHelperProps extends Stylable {
    helper?: string
}

export const FormHelper: React.FC<FormHelperProps> = ({ helper, ...props }) => {
    return helper ? (
        <Text fontSize="sm" color="gray.500" {...props}>
            {helper}
        </Text>
    ) : null
}

interface FormErrorProps extends Stylable {
    error?: string | boolean
}

export const FormError: React.FC<FormErrorProps> = ({ error, ...props }) => {
    return <ChakraFormErrorMessage {...props}>{error}</ChakraFormErrorMessage>
}

interface FormElementsProps
    extends FormLabelProps,
        FormHelperProps,
        FormErrorProps {
    props?: {
        formControlProps?: FormControlProps
        labelProps?: FormLabelProps
        helperProps?: FormHelperProps
        errorProps?: FormErrorProps
    }
    children?: React.ReactNode
}

export const FormElements: React.FC<FormElementsProps> = ({
    children,
    helper,
    error,
    label,
    name,
    props = {},
}) => {
    const { formControlProps, labelProps, helperProps, errorProps } = props
    return (
        <FormControl isInvalid={!!error} {...formControlProps}>
            {label || helper ? (
                <Stack spacing={1} mb={2}>
                    <FormLabel label={label} name={name} {...labelProps} />
                    <FormHelper helper={helper} {...helperProps} />
                </Stack>
            ) : null}
            {children}
            <FormError error={error} {...errorProps} />
        </FormControl>
    )
}

export const FormTextArea = React.forwardRef<
    HTMLTextAreaElement,
    FormElementsProps & TextareaProps
>(({ label, helper, error, props, name, ...rest }, ref) => {
    return (
        <FormElements
            helper={helper}
            error={error}
            label={label}
            name={name}
            props={props}
        >
            <Textarea id={name} name={name} w="full" ref={ref} {...rest} />
        </FormElements>
    )
})

export const FormInput = React.forwardRef<
    HTMLInputElement,
    FormElementsProps & InputProps
>(function FormInput({ label, helper, error, props, name, ...rest }, ref) {
    return (
        <FormElements
            helper={helper}
            error={error}
            label={label}
            name={name}
            props={props}
        >
            <Input id={name} name={name} w="full" ref={ref} {...rest} />
        </FormElements>
    )
})

export const FormCheckbox = React.forwardRef<
    HTMLInputElement,
    FormElementsProps & CheckboxProps
>(function FormCheckbox({ label, helper, error, name, props, ...rest }, ref) {
    return (
        <Stack
            as={FormControl}
            isInvalid={!!error}
            {...props?.formControlProps}
        >
            <HStack alignItems="center">
                <Checkbox
                    id={name}
                    name={name}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={`${name}-error`}
                    ref={ref}
                    {...rest}
                />
                {label || helper ? (
                    <FormLabel
                        userSelect="none"
                        label={label}
                        name={name}
                        {...props?.labelProps}
                    />
                ) : null}
            </HStack>
            <FormError error={error} {...props?.errorProps} />
        </Stack>
    )
})

interface FormRadioProps {
    options: {
        label: string
        value: string
        ref?: React.ForwardedRef<HTMLInputElement>
    }[]
    fieldsetProps?: StackProps
}

export const FormRadio = React.forwardRef<
    HTMLInputElement,
    FormElementsProps & RadioProps & FormRadioProps
>(function FormRadio(
    {
        label,
        helper,
        error,
        name,
        props,
        value,
        options,
        fieldsetProps,
        ...rest
    },
    ref
) {
    return (
        <FormElements
            helper={helper}
            error={error}
            label={label}
            name={name}
            props={props}
        >
            <RadioGroup
                id={name}
                name={name}
                aria-invalid={error ? true : undefined}
                aria-describedby={`${name}-error`}
            >
                <Stack as="fieldset" {...fieldsetProps}>
                    {options.map((option, i) => {
                        return (
                            <Radio
                                key={option.value}
                                id={`${name}-${option.value}`}
                                value={option.value}
                                {...rest}
                                ref={option.ref || ref}
                            >
                                {option.label}
                            </Radio>
                        )
                    })}
                </Stack>
            </RadioGroup>
        </FormElements>
    )
})
