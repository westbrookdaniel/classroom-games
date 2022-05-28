import * as React from 'react'
import { PopoverTrigger, Text } from '@chakra-ui/react'
import { TokenState } from '../store'
import { TokenDisplay } from './TokenDisplay'
import { TokenFormPopover } from './TokenFormPopover'
import { Tooltip } from './Tooltip'

interface TokenWithForm {
    token: TokenState
    isDisabled?: boolean
}

export function TokenWithForm({ token, isDisabled }: TokenWithForm) {
    const [showTooltip, setShowTooltip] = React.useState(false)

    React.useEffect(() => {
        if (!token.isCorrect) return
        setShowTooltip(true)
        setTimeout(() => setShowTooltip(false), 1500)
    }, [token.isCorrect])

    return (
        <TokenFormPopover token={token}>
            {({ onToggle, isOpen }) => (
                <Token
                    isTooltipOpen={showTooltip ? true : undefined}
                    disableTooltip={isOpen}
                    token={token}
                    isDisabled={isDisabled}
                >
                    <PopoverTrigger>
                        <TokenDisplay
                            isDisabled={isDisabled}
                            onClick={onToggle}
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
    return (
        <Tooltip
            label={token.isCorrect ? 'Correct!' : token.value}
            background={token.isCorrect ? 'green.500' : 'purple.700'}
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
