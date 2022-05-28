import { PopoverTrigger, Text, Tooltip, useTheme } from '@chakra-ui/react'
import { TokenState } from '../store'
import { TokenFormPopover } from './TokenFormPopover'

interface Props {
    token: TokenState
}

export default function Token({ token: { value } }: Props) {
    const theme = useTheme()
    const transperant = `${theme.colors.gray[200]}90`
    return (
        <TokenFormPopover tokenText={value}>
            {({ onToggle, isOpen }) => (
                <Tooltip
                    label={value}
                    minH="1.8em"
                    placement="top"
                    px={3}
                    py={1}
                    background="purple.700"
                    fontSize="xl"
                    display={isOpen ? 'none' : undefined}
                >
                    <Text as="span">
                        <PopoverTrigger>
                            <Text
                                as="span"
                                onClick={onToggle}
                                _hover={{
                                    background: transperant,
                                    outline: '0.2em',
                                    outlineColor: transperant,
                                    outlineStyle: 'solid',
                                    cursor: 'pointer',
                                    borderRadius: 'sm',
                                }}
                            >
                                {value}
                            </Text>
                        </PopoverTrigger>
                    </Text>
                </Tooltip>
            )}
        </TokenFormPopover>
    )
}
