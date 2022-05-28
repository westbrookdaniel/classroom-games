import * as React from 'react'
import Link from 'next/link'
import { Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormTextArea } from '../components/Form'
import { useStore } from '../store'
import { useRouter } from 'next/router'

interface FormValues {
    paragraph: string
}

const Create: NextPage = () => {
    const router = useRouter()
    const setParagraph = useStore((s) => s.setParagraph)

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = ({ paragraph }) => {
        setParagraph(paragraph)
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
                    label="Enter your paragraph (with errors)"
                    helper={`Put the correct spelling in curly braces after the word: "I like bred{bread}". Corrections (inside curly braces) can't contain spaces or punctuation.`}
                    error={errors.paragraph?.message}
                    autoComplete="off"
                    formControlProps={{ isRequired: true }}
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
                        Generate
                    </Button>
                </ButtonGroup>
            </Stack>
        </Stack>
    )
}

export default Create
