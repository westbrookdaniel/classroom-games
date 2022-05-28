import { Text } from '@chakra-ui/react'
import { useStore } from '../store'
import Token from './Token'

export default function TokenParagraph() {
    const tokenMap = useStore((s) => s.tokenMap)
    const tokens = Object.values(tokenMap).map((token, i) => (
        <Token key={i} token={token} />
    ))
    return (
        <Text as="div" fontSize="xl">
            {tokens}
        </Text>
    )
}
