import * as React from 'react'
import { PopoverTrigger, Text, useToast } from '@chakra-ui/react'
import { TokenState, useStore } from '../store'
import { TokenDisplay } from './TokenDisplay'
import { TokenFormPopover } from './TokenFormPopover'
import { Tooltip } from './Tooltip'

interface TokenWithForm {
    token: TokenState
    isDisabled?: boolean
    onClick?: () => void
}

export function TokenWithForm({ token, isDisabled, onClick }: TokenWithForm) {
    const hasNoHealth = useStore((s) => s.health === 0)

    return (
        <TokenFormPopover token={token}>
            {({ onToggle, isOpen }) => (
                <Token
                    // Don't show tooltips if you lost
                    disableTooltip={isOpen || hasNoHealth}
                    token={token}
                >
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
    disableTooltip?: boolean
    isTooltipOpen?: boolean
    children?: React.ReactNode
    isDisabled?: boolean
}

export function Token({
    token,
    disableTooltip,
    onClick,
    children,
    isTooltipOpen,
    isDisabled,
}: TokenProps) {
    function getBackground(token: TokenState) {
        if (token.isCorrect) return 'green.500'
        if (token.hasSelected) return 'red.500'
        return 'purple.700'
    }

    function getLabel(token: TokenState) {
        if (token.isCorrect) return 'Correct!'
        return token.value
    }

    return (
        <Tooltip
            label={getLabel(token)}
            background={getBackground(token)}
            display={isDisabled || disableTooltip ? 'none' : undefined}
            isOpen={isTooltipOpen}
            isDisabled={isDisabled}
        >
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
        </Tooltip>
    )
}
