import * as React from 'react'
import Link from 'next/link'
import { Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormCheckbox, FormInput, FormTextArea } from '../components/Form'
import { useStore } from '../store'
import { useRouter } from 'next/router'

interface FormValues {
    paragraph: string
    code: string
    hideCreate: boolean
}

const Create: NextPage = () => {
    const router = useRouter()
    const setParagraph = useStore((s) => s.setParagraph)

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = ({
        paragraph,
        code,
        hideCreate,
    }) => {
        const encodedParagraph = btoa(paragraph)
        router.push('/')
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
            <Stack spacing={8} w="full" maxW="xl">
                <Heading>Create</Heading>

                <FormTextArea
                    {...register('paragraph', {
                        required: 'Paragraph is required',
                    })}
                    label="Enter your paragraph"
                    helper={`Put the correct spelling in curly braces after the incorrect word: "I like bred{bread}". Corrections (words inside curly braces) can't contain spaces or punctuation.`}
                    error={errors.paragraph?.message}
                    autoComplete="off"
                    formControlProps={{ isRequired: true }}
                />

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
                    <Link href="/">
                        <Button type="button">Cancel</Button>
                    </Link>
                    <Button
                        colorScheme="green"
                        type="submit"
                        isLoading={isSubmitting}
                    >
                        Generate Link
                    </Button>
                </ButtonGroup>
            </Stack>
        </Stack>
    )
}

export default Create
