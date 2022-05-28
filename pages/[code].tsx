import * as React from 'react'
import Link from 'next/link'
import { Button, Stack } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import ParagraphGame from '../components/ParagraphGame'
import { useStore } from '../store'
import { getLinkByCode } from '../models/paragraphGameLink'
import { ParagraphGameLink } from '@prisma/client'

export const getServerSideProps: GetServerSideProps = async ({
    query,
    res,
}) => {
    const { code } = query

    if (typeof code !== 'string') throw new Error('code is not valid')

    const gameLink = await getLinkByCode({ code })

    // Cache the page
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    return { props: { gameLink } }
}

interface Props {
    gameLink: ParagraphGameLink | null
}

const LinkPage: NextPage<Props> = ({ gameLink }) => {
    const setParagraph = useStore((s) => s.setParagraph)

    if (!gameLink) return <div>Page not found</div>

    setParagraph(gameLink.paragraph)

    return (
        <Stack
            minH="100vh"
            minW="100vw"
            alignItems="center"
            justifyContent="center"
            p={6}
        >
            <Head>
                <title>Paragraph Game</title>
                <meta
                    name="description"
                    content="Some fun games for the classroom"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Stack
                flexGrow={1}
                justifyContent="center"
                mb={gameLink.hideCreate ? 8 : undefined}
            >
                <ParagraphGame />
            </Stack>
            {gameLink.hideCreate ? null : (
                <Link href="/create">
                    <Button variant="ghost" size="sm">
                        Create Your Own
                    </Button>
                </Link>
            )}
        </Stack>
    )
}

export default LinkPage
