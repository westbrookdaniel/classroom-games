import * as React from 'react'
import {
    Button,
    Text,
    ButtonGroup,
    Heading,
    Stack,
    useToast,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { FormCheckbox, FormInput, FormTextArea } from '../components/Form'
import { createLink } from '../utils/paragraphGameLink'
import { CopyLink } from '../components/CopyLink'
import { ParagraphPreview } from '../components/ParagraphPreview'
import { useRouter } from 'next/router'

export interface FormValues {
    paragraph: string
    code: string
    hideCreate: boolean
}

const Create: NextPage = () => {
    const router = useRouter()
    const toast = useToast({ position: 'top' })
    const [showLink, setShowLink] = React.useState<string | null>(null)

    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting, errors },
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = async ({
        paragraph,
        code,
        hideCreate,
    }) => {
        try {
            const res = await createLink({
                paragraph,
                code,
                hideCreate,
            })

            if (res.error) throw new Error(res.error)
            if (!res.data?.code)
                throw new Error('We had some trouble generating your link')

            toast({
                status: 'success',
                title: 'Your link is ready!',
            })
            setShowLink(`${window.location.origin}/${res.data?.code}`)
        } catch (error) {
            toast({
                status: 'error',
                title: 'Something went wrong',
                description:
                    typeof error === 'string' ? error : (error as any).message,
            })
        }
    }

    return (
        <Stack
            minH="100vh"
            minW="100vw"
            alignItems="center"
            justifyContent="center"
            p={6}
            noValidate
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
        >
            <Head>
                <title>Create - Paragraph Game</title>
                <meta
                    name="description"
                    content="A fun game for the classroom"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Stack spacing={12} w="full" maxW="xl">
                <Heading>Create</Heading>

                <Stack spacing={8}>
                    <FormTextArea
                        {...register('paragraph', {
                            required: 'Paragraph is required',
                        })}
                        label="Enter your paragraph"
                        helper={`Put the correct spelling in curly braces after the incorrect word: "I like bred{bread}". Corrections (words inside curly braces) can't contain spaces or punctuation. Put punctuation corrections inside square braces: "What time is it.[?]"`}
                        error={errors.paragraph?.message}
                        autoComplete="off"
                        props={{ formControlProps: { isRequired: true } }}
                    />

                    <ParagraphPreview control={control} />
                </Stack>

                <FormInput
                    {...register('code', {
                        pattern: {
                            value: /^[A-Za-z0-9_-]*$/,
                            message:
                                'Only letters, numbers, _ and - are allowed',
                        },
                    })}
                    label="Enter a custom link code (optional)"
                    error={errors.code?.message}
                    autoComplete="off"
                />

                <FormCheckbox
                    {...register('hideCreate')}
                    label={`Should "Create Your Own" be hidden?`}
                    defaultChecked
                    error={errors.hideCreate?.message}
                />

                <ButtonGroup display="flex" justifyContent="flex-end">
                    <Button onClick={router.back} type="button">
                        Cancel
                    </Button>
                    <Button
                        colorScheme="green"
                        type="submit"
                        isLoading={isSubmitting}
                    >
                        {showLink ? 'Generate Another' : 'Generate Link'}
                    </Button>
                </ButtonGroup>

                {showLink ? (
                    <Stack>
                        <Text>Your link is ready:</Text>
                        <CopyLink link={showLink} />
                    </Stack>
                ) : null}
            </Stack>
        </Stack>
    )
}

export default Create
