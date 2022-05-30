import * as React from 'react'
import { PopoverTrigger, Text } from '@chakra-ui/react'
import { TokenState } from '../store'
import { TokenDisplay } from './TokenDisplay'
import { TokenFormPopover } from './TokenFormPopover'

interface TokenWithForm {
    token: TokenState
    isDisabled?: boolean
    onClick?: () => void
}

export function TokenWithForm({ token, isDisabled, onClick }: TokenWithForm) {
    return (
        <TokenFormPopover token={token}>
            {({ onToggle }) => (
                <Token token={token}>
                    <PopoverTrigger>
                        <TokenDisplay
                            isDisabled={isDisabled}
                            onClick={() => {
                                onClick && onClick()
                                onToggle()
                            }}
                            token={token}
                        />
                    </PopoverTrigger>
                </Token>
            )}
        </TokenFormPopover>
    )
}

interface TokenProps {
    token: TokenState
    onClick?: () => void
    children?: React.ReactNode
    isDisabled?: boolean
}

export const Token = React.memo(
    function Token({ token, onClick, children, isDisabled }: TokenProps) {
        return (
            <Text as="span">
                {children ? (
                    children
                ) : (
                    <TokenDisplay
                        isDisabled={isDisabled}
                        onClick={onClick}
                        token={token}
                    />
                )}
            </Text>
        )
    },
    (prevProps, nextProps) => {
        if (
            prevProps.token.hasSelected === nextProps.token.hasSelected &&
            prevProps.token.isCorrect === nextProps.token.isCorrect &&
            prevProps.isDisabled === nextProps.isDisabled &&
            !prevProps.children &&
            !nextProps.children
        ) {
            return true
        }
        return false
    }
)
