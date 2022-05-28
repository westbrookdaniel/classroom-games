import { Text } from '@chakra-ui/react'
import { useStore } from '../store'
import { TokenWithForm } from './Token'

export default function TokenParagraph() {
    const tokenMap = useStore((s) => s.tokenMap)
    const tokens = Object.values(tokenMap).map((token, i) => (
        <TokenWithForm key={i} token={token} />
    ))
    return (
        <Text as="div" fontSize="xl">
            {tokens}
        </Text>
    )
}
