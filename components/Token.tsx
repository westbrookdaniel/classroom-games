import * as React from 'react'
import { PopoverTrigger, Text } from '@chakra-ui/react'
import { TokenState } from '../store'
import { TokenDisplay } from './TokenDisplay'
import { TokenFormPopover } from './TokenFormPopover'
import { Tooltip } from './Tooltip'

interface TokenWithForm {
    token: TokenState
}

export function TokenWithForm({ token }: TokenWithForm) {
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
                >
                    <PopoverTrigger>
                        <TokenDisplay onClick={onToggle} token={token} />
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
}

export function Token({
    token,
    disableTooltip,
    onClick,
    children,
    isTooltipOpen,
}: TokenProps) {
    return (
        <Tooltip
            label={token.isCorrect ? 'Correct!' : token.value}
            background={token.isCorrect ? 'green.500' : 'purple.700'}
            display={disableTooltip ? 'none' : undefined}
            isOpen={isTooltipOpen}
        >
            <Text as="span">
                {children ? (
                    children
                ) : (
                    <TokenDisplay onClick={onClick} token={token} />
                )}
            </Text>
        </Tooltip>
    )
}
