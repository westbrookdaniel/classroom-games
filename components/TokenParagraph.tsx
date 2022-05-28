import { Text } from '@chakra-ui/react'
import { useStore } from '../store'
import useStoreAnswers from '../utils/useStoreAnswers'
import { Token, TokenWithForm } from './Token'

export default function TokenParagraph() {
    const [tokenMap, subtractHealth, hasNoHealth] = useStore((s) => [
        s.tokenMap,
        s.subtractHealth,
        s.health === 0,
    ])

    const { isAllCorrect } = useStoreAnswers()

    const isDisabled = hasNoHealth || isAllCorrect

    const tokens = Object.values(tokenMap).map((token) => {
        if (!token.answer) {
            return (
                <Token
                    isDisabled={isDisabled}
                    key={token.id}
                    token={token}
                    onClick={!isDisabled ? subtractHealth : undefined}
                />
            )
        }
        return (
            <TokenWithForm
                isDisabled={isDisabled}
                key={token.id}
                token={token}
            />
        )
    })

    return (
        <Text as="div" fontSize="xl">
            {tokens}
        </Text>
    )
}
