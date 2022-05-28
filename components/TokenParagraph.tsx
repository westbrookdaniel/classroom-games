import { Text } from '@chakra-ui/react'
import { useStore } from '../store'
import { Token, TokenWithForm } from './Token'

export default function TokenParagraph() {
    const [tokenMap, subtractHealth] = useStore((s) => [
        s.tokenMap,
        s.subtractHealth,
    ])

    const tokens = Object.values(tokenMap).map((token) => {
        if (!token.answer) {
            return (
                <Token key={token.id} token={token} onClick={subtractHealth} />
            )
        }
        return <TokenWithForm key={token.id} token={token} />
    })

    return (
        <Text as="div" fontSize="xl">
            {tokens}
        </Text>
    )
}
