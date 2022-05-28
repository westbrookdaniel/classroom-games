import { Button, HStack, Input, useClipboard } from '@chakra-ui/react'
import * as React from 'react'

interface Props {
    link: string
}

export function CopyLink({ link }: Props) {
    const { hasCopied, onCopy } = useClipboard(link)
    return (
        <HStack>
            <Input value={link} isReadOnly />
            <Button onClick={onCopy}>{hasCopied ? 'Copied' : 'Copy'}</Button>
        </HStack>
    )
}
