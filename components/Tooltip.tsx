import { Tooltip as ChakraTooltip, TooltipProps } from '@chakra-ui/react'

export type { TooltipProps }

export function Tooltip(props: TooltipProps) {
    return (
        <ChakraTooltip
            minH="1.8em"
            placement="top"
            px={3}
            py={1}
            fontSize="xl"
            {...props}
        />
    )
}
