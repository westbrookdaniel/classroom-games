import { Text, useTheme } from '@chakra-ui/react'
import * as React from 'react'
import { TokenState } from '../store'

interface Props {
    onClick?: () => void
    token: TokenState
    isDisabled?: boolean
}

export const TokenDisplay = React.forwardRef<HTMLParagraphElement, Props>(
    function TokenDisplay({ token, onClick, isDisabled }, ref) {
        const theme = useTheme()
        const transperantGray = `${theme.colors.gray[200]}90`
        const transperantGreen = `${theme.colors.green[200]}90`

        const latestGuess = token.guess[token.guess.length - 1]

        if (token.isCorrect) {
            return (
                <Text
                    ref={ref}
                    as="span"
                    background={transperantGreen}
                    color="green.800"
                    style={{ outlineColor: transperantGreen }}
                    outline="0.2em solid"
                    borderRadius="sm"
                >
                    {latestGuess}
                </Text>
            )
        }

        return (
            <Text
                ref={ref}
                as="span"
                onClick={onClick}
                _hover={
                    isDisabled
                        ? undefined
                        : {
                              background: transperantGray,
                              outline: '0.2em',
                              outlineColor: transperantGray,
                              outlineStyle: 'solid',
                              cursor: 'pointer',
                              borderRadius: 'sm',
                          }
                }
            >
                {token.value}
            </Text>
        )
    }
)
