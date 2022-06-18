import { Text, useTheme } from '@chakra-ui/react'
import * as React from 'react'
import { TokenState } from '../store'

interface Props {
    onClick?: () => void
    token: TokenState
    isDisabled?: boolean
}

export const TokenDisplay = React.forwardRef<HTMLParagraphElement, Props>(
    function TokenDisplay(
        { token, onClick, isDisabled: isExternalDisabled },
        ref
    ) {
        const theme = useTheme()
        const lightGray = `${theme.colors.gray[200]}90`
        const lightGreen = `${theme.colors.green[200]}90`
        const lightRed = `${theme.colors.red[200]}90`

        const isDisabled = isExternalDisabled || token.type === 'none'

        if (token.isCorrect) {
            return (
                <Text
                    ref={ref}
                    as="span"
                    background={lightGreen}
                    _after={{
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderRadius: 'sm',
                        boxShadow: `${lightGreen} 0px 0px 0px 0.2em`,
                    }}
                    borderRadius="sm"
                    outline="none"
                    position="relative"
                    cursor="pointer"
                >
                    {token.answer}
                </Text>
            )
        }

        if (token.hasSelected) {
            return (
                <Text
                    ref={ref}
                    as="span"
                    onClick={isDisabled ? undefined : onClick}
                    borderRadius="sm"
                    outline="none"
                    position="relative"
                    cursor="pointer"
                    _hover={
                        isDisabled
                            ? undefined
                            : {
                                  _after: {
                                      content: '""',
                                      display: 'block',
                                      position: 'absolute',
                                      top: 0,
                                      bottom: 0,
                                      left: 0,
                                      right: 0,
                                      borderRadius: 'sm',
                                      boxShadow: `${lightRed} 0px 0px 0px 0.2em`,
                                  },
                                  background: lightRed,
                              }
                    }
                >
                    {token.value}
                </Text>
            )
        }

        return (
            <Text
                ref={ref}
                as="span"
                onClick={isDisabled ? undefined : onClick}
                borderRadius="sm"
                outline="none"
                position="relative"
                cursor="pointer"
                _hover={
                    isDisabled
                        ? undefined
                        : {
                              _after: {
                                  content: '""',
                                  display: 'block',
                                  position: 'absolute',
                                  top: 0,
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  borderRadius: 'sm',
                                  boxShadow: `${lightGray} 0px 0px 0px 0.2em`,
                              },
                              background: lightGray,
                          }
                }
            >
                {token.value}
            </Text>
        )
    }
)
