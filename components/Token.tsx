import { PopoverTrigger, Text, Tooltip } from '@chakra-ui/react'
import { TokenState } from '../store'
import { TokenDisplay } from './TokenDisplay'
import { TokenFormPopover } from './TokenFormPopover'

interface TokenWithForm {
    token: TokenState
}

export function TokenWithForm({ token }: TokenWithForm) {
    return (
        <TokenFormPopover token={token}>
            {({ onToggle, isOpen }) => (
                <Token disableTooltip={isOpen} token={token}>
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
    children?: React.ReactNode
}

export function Token({
    token,
    disableTooltip,
    onClick,
    children,
}: TokenProps) {
    return (
        <Tooltip
            label={token.value}
            minH="1.8em"
            placement="top"
            px={3}
            py={1}
            background="purple.700"
            fontSize="xl"
            display={disableTooltip ? 'none' : undefined}
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
