import { PopoverTrigger, Text, Tooltip, useTheme } from '@chakra-ui/react'
import { TokenForm } from './TokenForm'

interface Props {
    text: string
}

export default function Token({ text }: Props) {
    const theme = useTheme()
    const transperant = `${theme.colors.gray[200]}90`
    return (
        <TokenForm tokenText={text}>
            {({ onToggle, isOpen }) => (
                <Tooltip
                    label={text}
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
                                {text}
                            </Text>
                        </PopoverTrigger>
                    </Text>
                </Tooltip>
            )}
        </TokenForm>
    )
}
